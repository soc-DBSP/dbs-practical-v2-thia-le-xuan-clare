const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.create = function create(code, name, credit) {
  return prisma.module
    .create({
      data: {
        modCode: code,
        modName: name,
        creditUnit: Number(credit),
      },
    })
    .then(function (module) {
      return module;
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new module cannot be created with this module code and name",
          );
          throw new Error(`The module ${code} already exists`);
        }
      }
      throw error;
    });
};

module.exports.updateByCode = function updateByCode(code, credit) {
  return prisma.module
    .update({
      where: {
        modCode: code,
      },
      data: {
        creditUnit: Number(credit),
      },
    })
    .then(function (module) {
      // Leave blank
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2025") {
          console.log(
            "There is a unique constraint violation, this module cannot be updated with this module code",
          );
          throw new Error(`The module ${code} does not exists`);
        }
      }
      throw error;
    });
};

module.exports.deleteByCode = function deleteByCode(code) {
  return prisma.module
    .delete({
      where: {
        modCode: code
      }
    })
    .then(function (module) {
      // Leave blank
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2025") {
          console.log(
            "There is a unique constraint violation, this module cannot be deleted with this module code",
          );
          throw new Error(`The module ${code} does not exists`);
        }
      }
      throw error;
    });
};

module.exports.retrieveAll = function retrieveAll() {
  return prisma.module.findMany();
};

module.exports.retrieveByCode = function retrieveByCode(code) {
  return prisma.module
    .findUnique({
      where: { 
        modCode: code 
      } 
    })
    .catch(function (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === "P2025") {
          console.log(
            "There is a unique constraint violation, a module cannot be retrieved with this module code",
          );
          throw new Error(`The module ${code} does not exists`);
        }
      }
      throw error;
    });
};
