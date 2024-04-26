import {
  addBaniValidation,
  createAddressValidation,
  createContactValidation,
  createProfileValidation,
  profileBaniValidation,
  registerUserValidation,
  searchValidation,
  updateAddressValidation,
  updateContactValidation,
  updateProfileValidation,
  updateUserValidation,
  userIdValidation,
} from "../validation/admin-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

//* UNTUK SEARCH USER BY QUERY

const userRegisterAdmin = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username is already exist");
  }

  user.password = await bcrypt.hash(user.password, 10);
  user.username = await user.username.toLowerCase();

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      username: true,
    },
  });
};

const userSearchAdmin = async (request) => {
  request = validate(searchValidation, request);

  const searchQuery = request.query;
  const page = request.page;
  const skip = (page - 1) * request.size;

  const filters = {
    AND: {
      OR: [
        {
          username: {
            contains: searchQuery,
          },
        },
        {
          profil: {
            name: {
              contains: searchQuery,
            },
          },
        },
        {
          profil: {
            bani: {
              bani_name: {
                contains: searchQuery,
              },
            },
          },
        },
        {
          profil: {
            address: {
              village: {
                contains: searchQuery,
              },
            },
          },
        },
        {
          profil: {
            address: {
              district: {
                contains: searchQuery,
              },
            },
          },
        },
        {
          profil: {
            address: {
              city: {
                contains: searchQuery,
              },
            },
          },
        },
        {
          profil: {
            address: {
              province: {
                contains: searchQuery,
              },
            },
          },
        },
      ],
    },
  };

  const orderBy = [
    {
      profil: {
        bani: {
          id: "asc",
        },
      },
      profil: {
        generasi: {
          id: "asc",
        },
      },
    },
  ];

  const select = {
    id: true,
    username: true,
    profil: {
      select: {
        id: true,
        name: true,
        alive_status: true,
        anak_ke: true,
        parent: {
          select: {
            name: true,
          },
        },
        bani: {
          select: {
            bani_name: true,
          },
        },
        generasi: {
          select: {
            generasi_name: true,
          },
        },
        address: {
          select: {
            village: true,
            district: true,
            city: true,
          },
        },
      },
    },
  };

  const user = await prismaClient.user.findMany({
    where: filters,
    orderBy: orderBy,
    select: select,
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.user.count({
    where: filters,
  });

  return {
    data: user,
    paging: {
      page: page,
      total_item: totalItems,
      total_page: Math.ceil(totalItems / request.size),
    },
  };
};

const userGetByIdAdmin = async (request) => {
  const userId = validate(userIdValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      profil: true,
      profil: {
        include: {
          bani: true,
          generasi: true,
          subcription: true,
          parent: true,
          husband: true,
          wives: { orderBy: { istri_ke: "asc" } },
          children: { orderBy: { anak_ke: "asc" } },
          address: true,
          contact: true,
          profileBani: {
            select: {
              bani: {
                select: {
                  id: true,
                  bani_name: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new ResponseError(400, "User is not found");
  }

  return user;
};

const userUpdateAdmin = async (userId, user) => {
  userId = validate(userIdValidation, userId);
  user = validate(updateUserValidation, user);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      id: userId,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  const data = {
    username: user.username,
  };

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      id: userId,
    },
    data: data,
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
};

const userDeleteAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      id: userId,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  return prismaClient.user.delete({
    where: {
      id: userId,
    },
  });
};

const getProfileByIdAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);
  const profile = await prismaClient.profile.findUnique({
    where: {
      userId: userId,
    },
  });
  if (!profile) {
    throw new ResponseError(404, "Profile is not found");
  }

  return profile;
};

const getBaniProfileAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);
  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!profile) {
    throw new ResponseError(404, "Profile is not found");
  }

  const bani = await prismaClient.profileBani.findMany({
    where: {
      profileId: profile.id,
    },
    include: {
      profile: true,
      profile: { select: { name: true } },
      bani: true,
    },
    orderBy: [
      {
        baniId: "asc",
      },
    ],
  });

  return bani;
};

const addBaniProfileAdmin = async (userId, request) => {
  userId = validate(userIdValidation, userId);
  const bani = validate(addBaniValidation, request);

  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!profile) {
    throw new ResponseError(404, "Profile is not found");
  }

  const baniOnDatabase = await prismaClient.profileBani.count({
    where: {
      AND: [
        {
          profileId: profile.id,
        },
        {
          baniId: bani.baniId,
        },
      ],
    },
  });

  if (baniOnDatabase === 1) {
    throw new ResponseError(404, "Bani is already exist");
  }

  bani.profileId = profile.id;

  return prismaClient.profileBani.create({
    data: bani,
    select: {
      bani: {
        select: {
          bani_name: true,
        },
      },
    },
  });
};

const deleteBaniProfileAdmin = async (userId, request) => {
  userId = validate(userIdValidation, userId);
  const bani = validate(profileBaniValidation, request);

  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!profile) {
    throw new ResponseError(404, "Profile is not found");
  }

  const profileBani = await prismaClient.profileBani.count({
    where: {
      AND: [
        {
          profileId: profile.id,
        },
        {
          baniId: bani,
        },
      ],
    },
  });

  if (profileBani !== 1) {
    throw new ResponseError(404, "Bani is not found");
  }

  return prismaClient.profileBani.delete({
    where: {
      profileId_baniId: {
        profileId: profile.id,
        baniId: bani,
      },
    },
  });
};

const profileCreateAdmin = async (userId, profilData) => {
  userId = validate(userIdValidation, userId);
  const profile = validate(createProfileValidation, profilData);

  const countProfile = await prismaClient.profile.count({
    where: {
      userId: userId,
    },
  });

  if (countProfile === 1) {
    throw new ResponseError(400, "Profile is already exist");
  }

  if (request.gender === "MALE") {
    profile.avatar = "/images/avatar/male.jpg";
  } else if (request.gender === "FEMALE") {
    profile.avatar = "/images/avatar/female.jpg";
  } else {
    profile.avatar = "/images/avatar/unknown.jpg";
  }

  profile.userId = userId;

  return prismaClient.profile.create({
    data: profile,
    select: {
      name: true,
      gender: true,
      anak_ke: true,
      birthday: true,
      alive_status: true,
      status: true,
      avatar: true,
      user: {
        select: {
          username: true,
        },
      },
      husband: {
        select: {
          name: true,
        },
      },
      wife: {
        select: {
          name: true,
        },
      },
      parent: {
        select: {
          name: true,
        },
      },
      bani: {
        select: {
          bani_name: true,
        },
      },
      generasi: {
        select: {
          generasi_name: true,
        },
      },
    },
  });
};

const uploadAvatarProfileAdmin = async (userId, avatar) => {
  userId = validate(userIdValidation, userId);

  const totalProfileInDatabase = await prismaClient.profile.count({
    where: {
      userId: userId,
    },
  });

  if (totalProfileInDatabase !== 1) {
    throw new ResponseError(404, "Profile is not found");
  }

  return prismaClient.profile.update({
    where: {
      userId: userId,
    },
    data: {
      avatar: avatar,
    },
    select: {
      name: true,
      avatar: true,
    },
  });
};

const removeAvatarProfileAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);

  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  if (!profile) {
    throw new ResponseError(404, "Profile is not found");
  }

  const gender = profile.gender;
  var newAvatar = profile.avatar;

  if (gender === "MALE") {
    newAvatar = "/images/avatar/male.jpg";
  } else if (gender === "FEMALE") {
    newAvatar = "/images/avatar/female.jpg";
  } else {
    newAvatar = "/images/avatar/unknown.jpg";
  }

  return prismaClient.profile.update({
    where: {
      userId: userId,
    },
    data: {
      avatar: newAvatar,
    },
    select: {
      name: true,
      avatar: true,
    },
  });
};

const profileUpdateAdmin = async (userId, profilData) => {
  userId = validate(userIdValidation, userId);
  const profil = validate(updateProfileValidation, profilData);

  const totalProfileInDatabase = await prismaClient.profile.count({
    where: {
      userId: userId,
    },
  });

  if (totalProfileInDatabase !== 1) {
    throw new ResponseError(404, "Profile is not found");
  }

  return prismaClient.profile.update({
    where: {
      userId: userId,
    },
    data: {
      name: profil.name,
      gender: profil.gender,
      anak_ke: profil.anak_ke,
      birthday: profil.birthday,
      alive_status: profil.alive_status,
      status: profil.status,
      baniId: profil.baniId,
      husbandId: profil.husbandId,
      parentId: profil.parentId,
      generasiId: profil.generasiId,
      pendidikan: profil.pendidikan,
    },
    select: {
      name: true,
      gender: true,
      anak_ke: true,
      birthday: true,
      alive_status: true,
      status: true,
      avatar: true,
      user: {
        select: {
          username: true,
        },
      },
      husband: {
        select: {
          name: true,
        },
      },
      wife: {
        select: {
          name: true,
        },
      },
      parent: {
        select: {
          name: true,
        },
      },
      bani: {
        select: {
          bani_name: true,
        },
      },
      generasi: {
        select: {
          generasi_name: true,
        },
      },
    },
  });
};

const getContactByIdAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);
  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const countContact = await prismaClient.contact.count({
    where: {
      profileId: profileId,
    },
  });

  if (countContact !== 1) {
    throw new ResponseError(403, "Contact is not found");
  }

  return prismaClient.contact.findUnique({
    where: {
      profileId: profileId,
    },
    select: {
      email: true,
      phone: true,
      instagram: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

const getAddressByIdAdmin = async (userId) => {
  userId = validate(userIdValidation, userId);
  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const countAddress = await prismaClient.address.count({
    where: {
      profileId: profileId,
    },
  });

  if (countAddress !== 1) {
    throw new ResponseError(400, "Address is not found");
  }

  return prismaClient.address.findUnique({
    where: {
      profileId: profileId,
    },
    select: {
      street: true,
      village: true,
      district: true,
      city: true,
      province: true,
      postal_code: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

const contactCreateAdmin = async (userId, contactData) => {
  userId = validate(userIdValidation, userId);
  const contact = validate(createContactValidation, contactData);

  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const countContact = await prismaClient.contact.count({
    where: {
      profileId: profileId,
    },
  });

  if (countContact === 1) {
    throw new ResponseError(400, "Contact is already exist");
  }

  contact.profileId = profileId;

  return prismaClient.contact.create({
    data: contact,
    select: {
      email: true,
      phone: true,
      instagram: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

const contactUpdateAdmin = async (userId, contactData) => {
  userId = validate(userIdValidation, userId);
  const contact = validate(updateContactValidation, contactData);

  const profile = await prismaClient.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const totalContactInDatabase = await prismaClient.contact.count({
    where: {
      profileId: profileId,
    },
  });

  if (totalContactInDatabase !== 1) {
    throw new ResponseError(404, "Contact is not found");
  }

  return prismaClient.contact.update({
    where: {
      profileId: profileId,
    },
    data: {
      phone: contact.phone,
      email: contact.email,
      instagram: contact.instagram,
    },
    select: {
      email: true,
      phone: true,
      instagram: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

const addressCreateAdmin = async (userId, addressData) => {
  userId = validate(userIdValidation, userId);
  const address = validate(createAddressValidation, addressData);

  const profile = await prismaClient.profile.findFirst({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const countAddress = await prismaClient.address.count({
    where: {
      profileId: profileId,
    },
  });

  if (countAddress === 1) {
    throw new ResponseError(400, "Address is already exist");
  }

  address.profileId = profileId;

  return prismaClient.address.create({
    data: address,
    select: {
      street: true,
      village: true,
      district: true,
      city: true,
      province: true,
      postal_code: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

const addressUpdateAdmin = async (userId, addressData) => {
  userId = validate(userIdValidation, userId);
  const address = validate(updateAddressValidation, addressData);

  const profile = await prismaClient.profile.findUnique({
    where: {
      userId: userId,
    },
  });

  const profileId = profile.id;

  const totalAddressInDatabase = await prismaClient.address.count({
    where: {
      profileId: profileId,
    },
  });

  if (totalAddressInDatabase !== 1) {
    throw new ResponseError(404, "Address is not found");
  }

  return prismaClient.address.update({
    where: {
      profileId: profileId,
    },
    data: {
      street: address.street,
      village: address.village,
      district: address.district,
      city: address.city,
      province: address.province,
      postal_code: address.postal_code,
    },
    select: {
      street: true,
      village: true,
      district: true,
      city: true,
      province: true,
      postal_code: true,
      profile: {
        select: {
          name: true,
        },
      },
    },
  });
};

export default {
  userRegisterAdmin,
  userSearchAdmin,
  userGetByIdAdmin,
  userUpdateAdmin,
  userDeleteAdmin,
  profileCreateAdmin,
  profileUpdateAdmin,
  getProfileByIdAdmin,
  getBaniProfileAdmin,
  addBaniProfileAdmin,
  deleteBaniProfileAdmin,
  getContactByIdAdmin,
  getAddressByIdAdmin,
  uploadAvatarProfileAdmin,
  removeAvatarProfileAdmin,
  contactCreateAdmin,
  contactUpdateAdmin,
  addressCreateAdmin,
  addressUpdateAdmin,
};
