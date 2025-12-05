export const initialUsers = [
  {
    id: "admin-1",
    role: "admin",
    email: "admin@school.com",
    password: "admin123",
    name: "Super Admin"
  },
  {
    id: "student-1",
    role: "student",
    email: "john@student.com",
    password: "john123",
    name: "John Doe"
  },
  {
    id: "student-2",
    role: "student",
    email: "emma@student.com",
    password: "emma123",
    name: "Emma Watson"
  },
  {
    id: "student-3",
    role: "student",
    email: "sam@student.com",
    password: "sam123",
    name: "Sam Wilson"
  }
];

export const initialCustomFields = [
  {
    id: "cf-1",
    label: "Gender",
    key: "gender",
    type: "dropdown",
    required: true,
    options: ["Male", "Female", "Other"]
  },
  {
    id: "cf-2",
    label: "Date of Birth",
    key: "dob",
    type: "date",
    required: true
  },
  {
    id: "cf-3",
    label: "Is Scholarship Holder",
    key: "isScholarshipHolder",
    type: "checkbox",
    required: false
  },
  {
    id: "cf-4",
    label: "Profile Bio",
    key: "bio",
    type: "textarea",
    required: false
  }
];

export const initialStudents = [
  {
    id: "student-1",
    name: "John Doe",
    email: "john@student.com",
    phone: "+91-9876543210",
    status: "active",
    createdAt: "2024-07-10T10:00:00Z",
    customFields: {
      gender: "Male",
      dob: "2002-05-21",
      isScholarshipHolder: true,
      bio: "Computer science student with interest in frontend."
    }
  },
  {
    id: "student-2",
    name: "Emma Watson",
    email: "emma@student.com",
    phone: "+91-9123456780",
    status: "inactive",
    createdAt: "2024-07-15T11:30:00Z",
    customFields: {
      gender: "Female",
      dob: "2001-09-14",
      isScholarshipHolder: false,
      bio: "Design-focused learner exploring UI/UX."
    }
  },
  {
    id: "student-3",
    name: "Sam Wilson",
    email: "sam@student.com",
    phone: "+91-9988776655",
    status: "on-hold",
    createdAt: "2024-06-20T09:00:00Z",
    customFields: {
      gender: "Male",
      dob: "2003-01-30",
      isScholarshipHolder: true,
      bio: "Aspiring full-stack developer."
    }
  }
];
