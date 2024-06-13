import { ContractTypes,Positions } from "./bodies.util";

export const bigLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
export const letters = bigLetters + smallLetters;
export const digits = '0123456789';
export const alphanumeric = letters + digits;

export class RandomUtil {
    randomInt = (max: number = 10000000) => Math.floor(Math.random() * max);
    randomNameWithPrefix = () => 'api_' + this.randomInt().toString();

    randomChar(alphabet: string = alphanumeric) {
        return alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    randomName(length = 10, alphabet = alphanumeric): string {
        let text = '';
        for (let i = 0; i < length; i++) {
          text += this.randomChar(alphabet);
        }
        return text;
    }
    
    randomStringNumber(length: number = this.randomInt()): string {
        let number = '';
        for (let i = 0; i < length; i++) {
          const randomDigit = Math.floor(Math.random() * 10);
          number += randomDigit.toString();
        }
        return number;
    }

    randomDate(): string {
        const year = this.randomInt(2100);
        const month = this.randomInt(12);
        const day = this.randomInt(31);
        
        const maxDayInMonth = new Date(year, month, 0).getDate();
        const validDay = day <= maxDayInMonth ? day : maxDayInMonth;
        const randomDate = new Date(year, month - 1, validDay);
    
        return randomDate.toISOString();
    }
    
    
    randomPhoneNumber() {
        const minLength = 9;
        const maxLength = 14
        const phoneLength = this.randomInt(maxLength - minLength + 1) + minLength;

        let phoneNumber = '';
        for (let i = 0; i < phoneLength; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            phoneNumber += randomDigit.toString();
        }
        return phoneNumber;
    }
      
    randomEmail() {
      return `${this.randomName(10, smallLetters)}@api.pl`;
    }

    randomUserContractType(): ContractTypes {
        const contractTypes = Object.values(ContractTypes);
        const randomIndex = this.randomInt(contractTypes.length);
        return contractTypes[randomIndex];
    }

    randomUserPosition(): Positions {
        const positions = Object.values(Positions);
        const randomIndex = this.randomInt(positions.length);
        return positions[randomIndex];
    }
}
export const randomUtil = new RandomUtil;
