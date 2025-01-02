export const ParQDeclaration = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8 p-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h5 className="text-md font-semibold text-primaryBlue">
          PAR-Q+ Step 3 of 3: Participant Declaration
        </h5>
        <p className="text-sm">Please read and sign the declaration below:</p>
        <p className="text-sm">
          I, the undersigned, have read, understood to my full satisfaction and
          completed this questionnaire. I acknowledge that this physical activity
          clearance is valid for a maximum of 12 months from the date it is completed
          and becomes invalid if my condition changes. I also acknowledge that a
          Trustee (such as my employer, community/fitness centre, health care
          provider, or other designate) may retain a copy of this form for their
          records. In these instances, the Trustee will be required to adhere to
          local, national, and international guidelines regarding the storage of
          personal health information ensuring that they maintain the privacy of the
          information and do not misuse or wrongfully disclose such information.
        </p>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Form Section */}
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold mb-1">
              Sign your Full Name below<span className="text-red-300">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Full Name"
            />
          </div>
          <div>
            <label htmlFor="dateSigned" className="block text-sm font-semibold mb-1">
              Date Signed<span className="text-red-300">*</span>
            </label>
            <input
              type="date"
              id="dateSigned"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Select Date"
            />
          </div>
        </div>
        <div>
          <label htmlFor="witnessName" className="block text-sm font-semibold mb-1">
            Witness Name<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            id="witnessName"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Full Name"
          />
        </div>
      </div>

      {/* Blue Box Section */}
      <div className="bg-blue-300 border border-blue-100 rounded-none py-6 px-4 space-y-4">
        <p className="text-sm text-blue-800">
          Thank you for answering the PAR-Q+.{' '}
          <span className="font-bold">
            Please save a copy of your response by clicking “Download Response” and
            email it to your Fire Centre
          </span>
          , before moving forward with your recommitment.
        </p>
        <p className="text-sm text-blue-800">
          Please be aware that you will lose access to this PAR-Q+ form once you
          complete the recommitment process or click “Cancel” without downloading a
          copy.
        </p>
        <p className="text-sm text-blue-800 pt-8">
          If you answered more than one YES to any of the general questions in Step
          1, we highly encourage you to speak to your regional coordinator to discuss
          any deployment concerns.
        </p>
      </div>
    </div>
  );
};
