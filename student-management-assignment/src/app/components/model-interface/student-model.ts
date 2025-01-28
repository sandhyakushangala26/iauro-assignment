export interface IStudentFormDetails {
  rollNumber: number;
  firstName: string;
  lastName?: string;
  email: string;
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
      phone: '12346899',
      address: 'xyz sydbg ',
      termsConditions: true,
    },
    {
      rollNumber: 4,
      firstName: 'Vinitha',
      lastName: 'Sara',
      gender: 'Female',
      email: 'vinitha@gmail.com',
      phone: '12346899',
      address: 'xyz sydbg ',
      termsConditions: true,
    },
  ];
  