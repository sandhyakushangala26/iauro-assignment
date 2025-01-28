export interface IStudentFormDetails {
  rollNumber: number;
  firstName: string;
  lastName?: string;
  email: string;
  branch:any;
  phone: string;
  address: string;
  gender: string;
  termsConditions: boolean;
}

export const studentsSampleData: IStudentFormDetails[] = [
    {
      rollNumber: 1,
      firstName: 'Sandhya',
      lastName: 'Rani',
      gender: 'Female',
      email: 'sandhya@gmail.com',
      branch:'CSE',
      phone: '12346899',
      address: 'xyz sydbg ',
      termsConditions: true,
    },
    {
      rollNumber: 2,
      firstName: 'Bhuvana',
      lastName: 'Surest',
      gender: 'Female',
      email: 'bhuvana@gmail.com',
      branch:'ECE',
      phone: '12346899',
      address: 'xyz sydbg ',
      termsConditions: true,
    },
    {
      rollNumber: 3,
      firstName: 'poojs',
      lastName: 'Nangi',
      gender: 'Female',
      email: 'pooja@gmail.com',
      branch:'CIVIL',
      phone: '12346899',
      address: 'xyz sydbg ',
      termsConditions: true,
    },
  ];
  