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
    email = randomUtil.randomEmail(),
  } = {}) => {
    const startTime = randomUtil.randomDate();
    const endTime = randomUtil.randomOlderDate(startTime);
  
    return {
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
        startTime,
        endTime,
      },
      notes: randomUtil.randomName(50),
      isAdmin,
      isActivated,
    };
  };
  
export const authBody = (email: string, password: string) => {
    return {
        email,
        password,
    };
};
