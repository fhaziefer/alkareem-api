import {
  getUserValidation,
  loginUserValidation,
  logoutUserValidation,
  registerUserValidation,
  searchValidation,
  getAllValidation,
  updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

//* UNTUK REGISTRASI USER BARU

const userRegister = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username sudah digunakan");
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

//* UNTUK LOGIN USER DENGAN MENAMBAHKAN VALUE DI TOKEN

const userLogin = async (request) => {
  const loginRequest = validate(loginUserValidation, request);
  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password is wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password is wrong");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      id: true,
      username: true,
      token: true,
      role: {
        select: {
          role: true,
        },
      },
    },
  });
};

//* UNTUK GET DATA USER YANG LOGIN

const userGet = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
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
          profileBani: true,
          profileBani: {
            select: {
              bani: {
                select: {
                  id: true,
                  bani_name: true,
                },
              },
            },
            orderBy: [{ baniId: "asc" }],
          },
        },
      },
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return user;
};

//* UNTUK UPDATE DATA USER

const userUpdate = async (user, request) => {
  const userVal = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      id: user.id,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "User is not found");
  }

  const countUser = await prismaClient.user.count({
    where: {
      username: userVal.username,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Username sudah digunakan");
  }

  const data = {};

  if (userVal.password) {
    data.password = await bcrypt.hash(userVal.password, 10);
  }

  if (userVal.username) {
    data.username = userVal.username;
  }

  return prismaClient.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      id: true,
      username: true,
    },
  });
};

//* UNTUK LOGOUT USER DENGAN MENGHAPUS TOKEN USER

const userLogout = async (username) => {
  username = validate(logoutUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      id: true,
      username: true,
    },
  });
};

//* UNTUK SEARCH USER BY QUERY

const userSearch = async (request) => {
  request = validate(searchValidation, request);

  const searchQuery = request.query;
  const page = request.page;
  const skip = (page - 1) * request.size;

  const filters = [
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
  ];

  const select = {
    id: true,
    username: true,
    profil: {
      select: {
        id: true,
        name: true,
        alive_status: true,
        avatar: true,
        bani: {
          select: {
            bani_name: true,
          },
        },
      },
    },
  };

  const user = await prismaClient.user.findMany({
    where: {
      AND: {
        role: "USER",
        OR: filters,
      },
    },
    orderBy: [
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
    ],
    select: select,
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.user.count({
    where: {
      AND: {
        role: "USER",
        OR: filters,
      },
    },
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

//* UNTUK SEARCH USER BY QUERY AND BANI

const userSearchByBani = async (request) => {
  request = validate(searchValidation, request);

  const searchQuery = request.query;
  const baniQuery = request.bani;
  const page = request.page;
  const skip = (page - 1) * request.size;

  const filters = [
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
  ];

  const select = {
    id: true,
    username: true,
    profil: {
      select: {
        id: true,
        name: true,
        alive_status: true,
        avatar: true,
        profileBani: {
          select: {
            bani: {
              select: {
                bani_name: true,
              },
            },
          },
        },
      },
    },
  };

  const user = await prismaClient.user.findMany({
    where: {
      AND: {
        role: "USER",
        OR: filters,
        profil: {
          profileBani: {
            some: {
              bani: {
                bani_name: {
                  contains: baniQuery,
                },
              },
            },
          },
        },
      },
    },
    orderBy: [
      {
        profil: {
          generasi: {
            id: "asc",
          },
        },
      },
    ],
    select: select,
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.user.count({
    where: {
      AND: {
        role: "USER",
        OR: filters,
      },
    },
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

//* UNTUK GET ALL USER BY QUERY

const userGetAll = async (request) => {
  request = validate(getAllValidation, request);

  const page = request.page;
  const skip = (page - 1) * request.size;

  const select = {
    id: true,
    username: true,
    profil: {
      select: {
        name: true,
        avatar: true,
        alive_status: true,
        husband: {
          select: {
            name: true,
          },
        },
        wives: {
          select: {
            id: true,
            istri_ke: true,
            name: true,
            alive_status: true,
          },
          orderBy: {
            istri_ke: "asc",
          },
        },
        parent: {
          select: {
            name: true,
            alive_status: true,
          },
        },
        generasi: {
          select: {
            generasi_name: true,
          },
        },
        bani: {
          select: {
            bani_name: true,
          },
        },
        contact: {
          select: {
            phone: true,
            instagram: true,
            email: true,
          },
        },
        address: {
          select: {
            street: true,
            village: true,
            district: true,
            city: true,
            province: true,
          },
        },
      },
    },
  };

  const user = await prismaClient.user.findMany({
    where: {
      AND: {
        role: "USER",
      },
    },
    orderBy: [
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
    ],
    select: select,
    take: request.size,
    skip: skip,
  });

  const totalItems = await prismaClient.user.count({
    where: {
      AND: {
        role: "USER",
      },
    },
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

//* UNTUK GET USER BY ID

const userGetById = async (request) => {
  const userId = validate(getUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      role: true,
      createdAt: true,
      updatedAt: true,
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
          profileBani: true,
          profileBani: {
            select: {
              bani: {
                select: {
                  id: true,
                  bani_name: true,
                },
              },
            },
            orderBy: [{ baniId: "asc" }],
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

//* UNTUK GET CHILDREN BY ID

const userGetChildrenById = async (request) => {
  const userId = validate(getUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      profil: {
        select: {
          name: true,
          children: {
            select: {
              userId: true,
              anak_ke: true,
              name: true,
              gender: true,
              alive_status: true,
            },
            orderBy: [{ anak_ke: "asc" }],
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

//* UNTUK MENGHITUNG JUMLAH ANGGOTA BANI

const userGetTotal = async () => {
  const totalItems = await prismaClient.user.count({
    where: {
      role: "USER",
    },
  });

  const totalFamily = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        status: "MARRIED",
      },
    },
  });

  const totalSingle = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        alive_status: true,
        status: "SINGLE",
      },
    },
  });

  const totalMale = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        gender: "MALE",
      },
    },
  });

  const totalFemale = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        gender: "FEMALE",
      },
    },
  });

  const totalAlive = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        alive_status: true,
      },
    },
  });

  const totalDeath = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        alive_status: false,
      },
    },
  });

  const totalHannah = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Hannah",
        },
      },
    },
  });

  const totalSalamah = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Salamah",
        },
      },
    },
  });

  const totalAisyah = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Aisyah",
        },
      },
    },
  });

  const totalMaryam = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Maryam",
        },
      },
    },
  });

  const totalZainab = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Zainab",
        },
      },
    },
  });

  const totalQomariyah = await prismaClient.user.count({
    where: {
      role: "USER",
      profil: {
        bani: {
          bani_name: "Bani Qomariyah",
        },
      },
    },
  });

  return {
    totalUser: totalItems,
    totalFamily: totalFamily,
    totalSingle: totalSingle,
    totalAlive: totalAlive,
    totalDeath: totalDeath,
    totalMale: totalMale,
    totalFemale: totalFemale,
    totalHannah: totalHannah,
    totalSalamah: totalSalamah,
    totalAisyah: totalAisyah,
    totalMaryam: totalMaryam,
    totalZainab: totalZainab,
    totalQomariyah: totalQomariyah,
  };
};

export default {
  userRegister,
  userLogin,
  userGet,
  userUpdate,
  userLogout,
  userSearch,
  userSearchByBani,
  userGetAll,
  userGetById,
  userGetChildrenById,
  userGetTotal,
};
