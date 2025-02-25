import { useState } from 'react';

interface SupervisorFormProps {
  initialData: {
    supervisorFirstName: string;
    supervisorLastName: string;
    supervisorEmail: string;
    supervisorPhone?: string;
  };
  onUpdate: (data: {
    supervisorFirstName: string;
    supervisorLastName: string;
    supervisorEmail: string;
    supervisorPhone?: string;
  }) => void;
}

export const SupervisorForm = ({ initialData, onUpdate }: SupervisorFormProps) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;
    name === 'phone' && value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    
    const newData = { ...formData, [name]: value };
    
    setFormData(newData);
    onUpdate(newData);
  };

  return (
    <div className="px-6 flex-grow">
      <p className="font-bold text-sm">
        Please verify your supervisor information below and make any changes if
        needed. If correct, click “Next”. Your recommitment request will be sent to
        your supervisor once confirmed.
      </p>
      <p className="text-xs py-2">
        Changes will appear in &quot;Profile Details.&quot;
      </p>
      <div className="pb-12 pt-6 grid grid-cols-2 gap-y-8 gap-x-6">
        <div className="col-span-1">
          <label
            htmlFor="firstName"
            className="block text-sm font-bold text-black mb-1"
          >
            Supervisor First Name<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="supervisorFirstName"
            value={formData.supervisorFirstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Last Name */}
        <div className="col-span-1">
          <label
            htmlFor="supervisorLastName"
            className="block text-sm font-bold text-black mb-1"
          >
            Supervisor Last Name<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="supervisorLastName"
            name="supervisorLastName"
            value={formData.supervisorLastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div className="col-span-1">
          <label htmlFor="email" className="block text-sm font-bold text-black mb-1">
            Supervisor Email<span className="text-red-300">*</span>
          </label>
          <input
            type="email"
            id="supervisorEmail"
            name="supervisorEmail"
            value={formData.supervisorEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-600">Must be a valid @gov.bc.ca email</p>
        </div>

        {/* Phone */}
        <div className="col-span-1">
          <label htmlFor="supervisorPhone" className="block text-sm font-bold text-black mb-1">
            Supervisor Phone Number
          </label>
          <input
            type="tel"
            id="supervisorPhone"
            name="supervisorPhone"
            value={formData.supervisorPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {formData?.supervisorPhone && !(/(\d{3})(\d{3})(\d{4})/).test(formData?.supervisorPhone) && <p className="text-xs text-error">Please enter only 10 digits for phone number</p>}
        </div>
      </div>
    </div>
  );
};
