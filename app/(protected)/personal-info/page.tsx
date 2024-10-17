"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  fetchEmployeeById,
  fetchEmployeeIdByUserId,
} from "../../lib/redux/slices/employeeSlice";
import { RootState, useAppDispatch } from "../../lib/redux/store";

const PersonalInfoPage = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const employeeId = useSelector(
    (state: RootState) => state.employee.employeeId
  );
  const employee = useSelector((state: RootState) => state.employee.employee);
  const status = useSelector((state: RootState) => state.employee.status);
  const error = useSelector((state: RootState) => state.employee.error);

  useEffect(() => {
    if (user && user.id && !employeeId) {
      dispatch(fetchEmployeeIdByUserId(user.id));
      // console.log("userId", user.id);
      // console.log("employeeId", employeeId);
    }
  }, [dispatch, user, employeeId]);

  useEffect(() => {
    if (employeeId) {
      dispatch(fetchEmployeeById(employeeId));
    }
  }, [dispatch, employeeId]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <section className="main-container">
      <h1 className="header-text text-3xl font-bold mt-4">Personal Info</h1>
      {employee ? (
        <div className="mt-4 text-lg">
          <p>First Name: {employee.firstName}</p>
          <p>Last Name: {employee.lastName}</p>
          <p>SSN: {employee.ssn}</p>
          <p>Birthday: {employee.birthday}</p>
          <p>Gender: {employee.gender}</p>
          <p>Identity: {employee.identity}</p>
          <p>Email: {employee.email}</p>

          {/* Address Information */}
          {employee.address && employee.address.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Address</h2>
              {employee.address.map((addr: any, index: number) => (
                <div key={index} className="mt-2">
                  <p>Building: {addr.building}</p>
                  <p>Street Name: {addr.streetName}</p>
                  <p>City: {addr.city}</p>
                  <p>State: {addr.state}</p>
                  <p>Zip: {addr.zip}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No address data available.</p>
          )}

          {/* Phone Information */}
          {employee.phone && employee.phone.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Phone</h2>
              {employee.phone.map((ph: any, index: number) => (
                <div key={index} className="mt-2">
                  <p>Cell Phone: {ph.cellPhone}</p>
                  <p>Work Phone: {ph.workPhone}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No phone data available.</p>
          )}

          {/* Reference Information */}
          {employee.reference ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Reference</h2>
              <p>First Name: {employee.reference.firstName}</p>
              <p>Last Name: {employee.reference.lastName}</p>
              <p>Phone: {employee.reference.phone}</p>
              <p>Email: {employee.reference.email}</p>
              <p>Relationship: {employee.reference.relationship}</p>
            </div>
          ) : (
            <p>No reference data available.</p>
          )}

          {/* Work Authorization */}
          {employee.workAuthorization ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Work Authorization</h2>
              <p>Visa Type: {employee.workAuthorization.visaType}</p>
              <p>Start Date: {employee.workAuthorization.startDate}</p>
              <p>End Date: {employee.workAuthorization.endDate}</p>
              {employee.workAuthorization.documents &&
                employee.workAuthorization.documents.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mt-4">Documents</h3>
                    {employee.workAuthorization.documents.map(
                      (doc: any, index: number) => (
                        <div key={index} className="mt-2">
                          <p>File Name: {doc.fileName}</p>
                          <p>
                            File URL:{" "}
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {doc.fileUrl}
                            </a>
                          </p>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          ) : (
            <p>No work authorization data available.</p>
          )}

          {/* Documents */}
          {employee.documents && employee.documents.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Documents</h2>
              {employee.documents.map((doc: any, index: number) => (
                <div key={index} className="mt-2">
                  <p>File Name: {doc.fileName}</p>
                  <p>
                    File URL:{" "}
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doc.fileUrl}
                    </a>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No documents data available.</p>
          )}

          {/* Emergency Contacts */}
          {employee.emergencyContacts &&
          employee.emergencyContacts.length > 0 ? (
            <div>
              <h2 className="text-2xl font-bold mt-4">Emergency Contacts</h2>
              {employee.emergencyContacts.map((contact: any, index: number) => (
                <div key={index} className="mt-2">
                  <p>First Name: {contact.firstName}</p>
                  <p>Last Name: {contact.lastName}</p>
                  <p>Phone: {contact.phone}</p>
                  <p>Email: {contact.email}</p>
                  <p>Relationship: {contact.relationship}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No emergency contacts available.</p>
          )}
        </div>
      ) : (
        <p>No employee data found.</p>
      )}
    </section>
  );
};

export default PersonalInfoPage;
