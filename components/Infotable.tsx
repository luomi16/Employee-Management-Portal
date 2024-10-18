import { Employee } from "@/app/types/employee";

interface InfotableProps {
  employee: Employee;
}

export default function Infotable({ employee }: InfotableProps) {
  return (
    <div className="flow-root">
      <dl className="-my-3 divide-y  text-sm divide-gray-700">
        <h2 className="text-4xl font-bold mt-4">Personal Info</h2>
        <br></br>
        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">Legal Name</dt>
          <dd className="sm:col-span-2 text-gray-200">
            {employee.firstName} {employee.middleName} {employee.lastName}
          </dd>
        </div>

        {employee.prefferedName && (
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
            <dt className="font-medium text-white">Preffered Name</dt>
            <dd className="sm:col-span-2 text-gray-200">
              {employee.prefferedName}
            </dd>
          </div>
        )}

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">SSN</dt>
          <dd className="sm:col-span-2 text-gray-200">{employee.ssn}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">Birthday</dt>
          <dd className="sm:col-span-2 text-gray-200">{employee.birthday}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">Gender</dt>
          <dd className="sm:col-span-2 text-gray-200">{employee.gender}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">Email</dt>
          <dd className="sm:col-span-2 text-gray-200">{employee.email}</dd>
        </div>

        <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
          <dt className="font-medium text-white">Identity</dt>
          <dd className="sm:col-span-2 text-gray-200">{employee.identity}</dd>
        </div>

        {/* Address Information */}
        {employee.address && (
          <>
            <h2 className="text-2xl font-bold mt-4">Address</h2>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">Street Name</dt>
              <dd className="sm:col-span-2 text-gray-200">
                {employee.address.streetName}
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">City</dt>
              <dd className="sm:col-span-2 text-gray-200">{employee.address.city}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">State</dt>
              <dd className="sm:col-span-2 text-gray-200">{employee.address.state}</dd>
            </div>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">Zip</dt>
              <dd className="sm:col-span-2 text-gray-200">{employee.address.zip}</dd>
            </div>
          </>
        )}

        {/* Phone Information */}
        {employee.phone && (
          <>
            <h2 className="text-2xl font-bold mt-4">电话</h2>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">电话号码</dt>
              <dd className="sm:col-span-2 text-gray-200">{employee.phone}</dd>
            </div>
          </>
        )}

        {/* Reference Information */}
        {employee.reference && employee.reference.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mt-4">References</h2>
            {employee.reference.map((ref, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold mt-2">Reference {index + 1}</h3>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">First Name</dt>
                  <dd className="sm:col-span-2 text-gray-200">{ref.firstName}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">Last Name</dt>
                  <dd className="sm:col-span-2 text-gray-200">{ref.lastName}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">Phone</dt>
                  <dd className="sm:col-span-2 text-gray-200">{ref.phone}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">Email</dt>
                  <dd className="sm:col-span-2 text-gray-200">{ref.email}</dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">Relationship</dt>
                  <dd className="sm:col-span-2 text-gray-200">{ref.relationship}</dd>
                </div>
              </div>
            ))}
          </>
        )}

        {/* WorkAuthorization */}
        {employee.workAuthorization && (
          <>
            <h2 className="text-2xl font-bold mt-4">Work Authorization</h2>
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">Visa Type</dt>
              <dd className="sm:col-span-2 text-gray-200">
                {employee.workAuthorization.visaType}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">Start Date</dt>
              <dd className="sm:col-span-2 text-gray-200">
                {employee.workAuthorization.startDate}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
              <dt className="font-medium text-white">End Date</dt>
              <dd className="sm:col-span-2 text-gray-200">
                {employee.workAuthorization.endDate}
              </dd>
            </div>

            {employee.workAuthorization.documents &&
              employee.workAuthorization.documents.length > 0 && (
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                  <dt className="font-medium text-white">Documents</dt>
                  <dd className="sm:col-span-2 text-gray-200">
                    {employee.workAuthorization.documents.map((doc, index) => (
                      <div key={index}>
                        <p>File Name: {doc.fileName}</p>
                        <p>
                          File URL:{" "}
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400"
                          >
                            {doc.fileUrl}
                          </a>
                        </p>
                      </div>
                    ))}
                  </dd>
                </div>
              )}
          </>
        )}

        {/* emergency Contact */}
        {employee.emergencyContacts &&
          employee.emergencyContacts.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-4">Emergency Contact</h2>
              {employee.emergencyContacts.map((contact, index) => (
                <div key={index}>
                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                    <dt className="font-medium text-white">First Name</dt>
                    <dd className="sm:col-span-2 text-gray-200">
                      {contact.firstName}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                    <dt className="font-medium text-white">Last Name</dt>
                    <dd className="sm:col-span-2 text-gray-200">
                      {contact.lastName}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                    <dt className="font-medium text-white">Phone</dt>
                    <dd className="sm:col-span-2 text-gray-200">
                      {contact.phone}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                    <dt className="font-medium text-white">Email</dt>
                    <dd className="sm:col-span-2 text-gray-200">
                      {contact.email}
                    </dd>
                  </div>

                  <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 even:bg-gray-800">
                    <dt className="font-medium text-white">Relationship</dt>
                    <dd className="sm:col-span-2 text-gray-200">
                      {contact.relationship}
                    </dd>
                  </div>
                </div>
              ))}
            </>
          )}
      </dl>
    </div>
  );
}
