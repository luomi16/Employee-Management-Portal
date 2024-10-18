// components/employee/BasicEmployeeInfo.tsx
import { Control, useFormContext } from "react-hook-form";

interface BasicEmployeeInfoProps {
  control: Control<any>;
}

const BasicEmployeeInfo: React.FC<BasicEmployeeInfoProps> = ({ control }) => {
    const { register, formState: { errors } } = useFormContext();
    return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Basic Employee Info</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="First Name"
            />
            {errors.firstName && (
              <p className="text-red-500">
                {typeof errors.firstName.message === "string"
                  ? errors.firstName.message
                  : "Invalid first name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="text-red-500">
                {typeof errors.lastName.message === "string"
                  ? errors.lastName.message
                  : "Invalid last name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Middle Name
            </label>
            <input
              type="text"
              {...register("middleName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Middle Name"
            />
            {errors.middleName && (
              <p className="text-red-500">
                {typeof errors.middleName.message === "string"
                  ? errors.middleName.message
                  : "Invalid middle name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Preferred Name
            </label>
            <input
              type="text"
              {...register("preferredName")}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Preferred Name"
            />
            {errors.preferredName && (
              <p className="text-red-500">
                {typeof errors.preferredName.message === "string"
                  ? errors.preferredName.message
                  : "Invalid preferred name"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="testuser@example.com"
            />
            {errors.email && (
              <p className="text-red-500">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : "Invalid email address"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              SSN
            </label>
            <input
              type="text"
              {...register("ssn", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="123-45-6789"
            />
            {errors.ssn && (
              <p className="text-red-500">
                {typeof errors.ssn.message === "string"
                  ? errors.ssn.message
                  : "Invalid SSN"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Birthday
            </label>
            <input
              type="date"
              {...register("birthday", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Birthday"
            />
            {errors.birthday && (
              <p className="text-red-500">
                {typeof errors.birthday.message === "string"
                  ? errors.birthday.message
                  : "Invalid birthday"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 p-2">
              Gender
            </label>
            <select
              {...register("gender", { required: true })}
              className="text-gray-700 p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="FEMALE">Female</option>
              <option value="MALE">Male</option>
              <option value="NOTTOANSWER">Prefer Not to Answer</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">
                {typeof errors.gender.message === "string"
                  ? errors.gender.message
                  : "Invalid gender"}
              </p>
            )}
          </div>
        </div>
    </div>
  );
};

export default BasicEmployeeInfo;
