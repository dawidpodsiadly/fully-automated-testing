import { randomUtil } from "./random.util";

export enum ContractTypes {
    Employment = "Employment",
    B2B = "B2B",
    Mandate = "Mandate"
}

export enum Positions {
    Storekeeper = "Storekeeper",
    IT = "IT",
    Accountant = "Accountant"
}

export const userBody = ({
  isAdmin = true,
  isActivated = true,
  email = randomUtil.randomNameWithPrefix(),
} = {}) => ({
  name: randomUtil.randomNameWithPrefix(),
  surname: randomUtil.randomNameWithPrefix(),
  email,
  password: randomUtil.randomName(),
  phoneNumber: randomUtil.randomPhoneNumber(),
  birthDate: randomUtil.randomDate(),
  contract: {
      type: randomUtil.randomUserContractType(),
      salary: randomUtil.randomInt(),
      position: randomUtil.randomUserPosition(),
      startTime: new Date('1673-11-11').toISOString(),
      endTime: new Date('1918-11-11').toISOString(),
  },
  notes: randomUtil.randomName(50),
  isAdmin,
  isActivated,
});



export const authBody = (email: string, password: string) => {
    return {
        email,
        password,
    };
};
