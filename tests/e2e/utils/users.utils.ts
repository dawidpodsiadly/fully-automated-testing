import {usersApi, ApiUserData} from '../api/users-api';
import {CreateUserData} from '../models/user-creator/user-creator.model';
import {randomUtil} from './random.utils';

export enum UserContractPositions {
  Empty = 'Select Position',
  Storekeeper = 'Storekeeper',
  Accountant = 'Accountant',
  IT = 'IT',
}

export enum UserContractTypes {
  Empty = 'Select Contract Type',
  Employment = 'Employment',
  Mandate = 'Mandate',
  B2B = 'B2B',
}

export async function createUserByApi(isAdmin = true, isActivated = true) {
  const userData = await generateRandomApiUserData(isAdmin, isActivated);
  return await usersApi.createUser(userData);
}

export async function generateRandomApiUserData(isAdmin = true, isActivated = true): Promise<ApiUserData> {
  const startTime = randomUtil.randomDate();
  const endTime = randomUtil.randomYoungerDate(startTime);

  return {
    name: randomUtil.randomName(),
    surname: randomUtil.randomName(),
    email: randomUtil.randomEmail(),
    password: randomUtil.randomName(9),
    phoneNumber: randomUtil.randomPhoneNumber(),
    birthDate: randomUtil.randomDate(),
    contract: {
      type: randomUtil.randomUserContractType(),
      salary: randomUtil.randomInt(),
      position: randomUtil.randomUserPosition(),
      startTime,
      endTime,
    },
    age: randomUtil.randomInt(),
    notes: randomUtil.randomName(50),
    isAdmin,
    isActivated,
  };
}

export async function generateRandomUserData(isAdmin = true, isActivated = true) {
  const startTime = randomUtil.randomDate();
  const endTime = randomUtil.randomYoungerDate(startTime);

  return {
    name: randomUtil.randomName(),
    surname: randomUtil.randomName(),
    email: randomUtil.randomEmail(),
    password: randomUtil.randomName(9),
    phoneNumber: randomUtil.randomPhoneNumber(),
    birthDate: randomUtil.randomDate(),
    contract: {
      type: randomUtil.randomUserContractType(),
      salary: randomUtil.randomInt().toString(),
      position: randomUtil.randomUserPosition(),
      startTime,
      endTime,
    },
    age: randomUtil.randomInt().toString(),
    notes: randomUtil.randomName(50),
    isAdmin,
    isActivated,
  };
}

export async function deleteUserByApi(userId: string) {
  return await usersApi.deleteUser(userId);
}
