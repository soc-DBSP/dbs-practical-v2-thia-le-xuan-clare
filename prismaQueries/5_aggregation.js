const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const util = require("util");

function getMeanCourseFee() {
  return prisma.course.aggregate({
    _avg: {
      crseFee: true,
    },
  });
}

/** Section A */

function getNumberOfFullTimeStaff() {
  return prisma.staff.aggregate({
    _count: {
      staffNo: true,
    },
    where: {
      typeOfEmployment: "FT",
    },
  });
}

/** Section B */

function getTotalAllowanceOfStaffByGrade() {
  return prisma.staff.groupBy({
    by: ["grade"],
    _sum: {
      allowance: true,
    },
    orderBy: {
      grade: "desc",
    },
    where: {
      grade: {
        startsWith: "L",
      }, //OR not: {contains: 'S'}
      allowance: {
        not: null, //OR gt: 0
      },
    },
  });
}

function getTotalPayAndNoOfStaffByDeptWithHighTotal() {
  return prisma.staff.groupBy({
    by: ['deptCode'],
    _sum: {
      pay: true,
    },
    _count: {
      staffNo: true,
    },
    orderBy: {
     _sum: {
        pay: "desc",
      }
    },
     having: {
        pay: {
      _sum: {
          gt: 20000,
        },
      }
    },
    where: {
      deptCode: {
        not: "DPO",
      },
    }
  });
}

/** Using Raw Query */

function getAvgLabFeeWithRawQuery() {
  return prisma.$queryRaw`SELECT AVG(COALESCE(lab_fee, 0)) AS "Mean Lab Fee" FROM course;`;
}

async function main(argument) {
  let results;
  switch (argument) {
    case "getMeanCourseFee":
      results = await getMeanCourseFee();
      break;
    case "getNumberOfFullTimeStaff":
      results = await getNumberOfFullTimeStaff();
      break;
    case "getTotalAllowanceOfStaffByGrade":
      results = await getTotalAllowanceOfStaffByGrade();
      break;
    case "getTotalPayAndNoOfStaffByDeptWithHighTotal":
      results = await getTotalPayAndNoOfStaffByDeptWithHighTotal();
      break;
    case "getAvgLabFeeWithRawQuery":
      results = await getAvgLabFeeWithRawQuery();
      break;
    default:
      console.log("Invalid argument");
  }
  results &&
    console.log(
      util.inspect(results, { showHidden: false, depth: null, colors: true }),
    );
}

main(process.argv[2]);
