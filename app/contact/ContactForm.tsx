import { useState } from "react";

export default function ContactForm() {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(inputs);
  };

  return (
    <div className="bg-oceanDark pb-10">
      <div className="mx-auto max-w-md px-5 py-16 lg:mx-auto lg:flex lg:max-w-6xl">
        {/* Text */}
        <div className="lg:w-1/2">
          <h1 className="mb-6 text-3xl text-oceanCool lg:text-5xl lg:leading-snug">
            SEND US A MESSAGE
          </h1>
          <p className="mb-8 w-4/5 text-oceanCool">
            If you are interested in hearing more about the way we work, have a
            business proposal, or are interested in making a purchase, we would
            love to hear from you.
          </p>
          {/* Seprator */}
          <div className="clr-invert mb-6 h-[6px] w-12 lg:h-4 lg:w-24"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:w-1/2">
          <label>
            <span>First Name*</span>
            <input
              className="mb-6 block w-full border border-oceanLight bg-oceanDark p-3 text-oceanCool placeholder-oceanLight focus:outline-none"
              type="text"
              placeholder="First Name"
              name="firstname"
              value={inputs.firstname || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Last Name*</span>
            <input
              className="mb-6 block w-full border border-oceanLight bg-oceanDark p-3 text-oceanCool placeholder-oceanLight focus:outline-none"
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={inputs.lastname || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Email*</span>
            <input
              className="mb-6 block w-full border border-oceanLight bg-oceanDark p-3 text-oceanCool placeholder-oceanLight focus:outline-none"
              type="email"
              placeholder="Email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Message*</span>
            <textarea
              className="mb-6 block w-full border border-oceanLight bg-oceanDark p-3 text-oceanCool placeholder-oceanLight focus:outline-none"
              placeholder="Message"
              name="message"
              value={inputs.message || ""}
              onChange={handleChange}
              rows={4}
            />
          </label>
          <input
            className="float-right border-2 border-oceanLight bg-oceanDark px-16 py-3 font-bold text-oceanLight hover:border-transparent hover:bg-oceanLight hover:text-oceanDark"
            type="submit"
            value="SUBMIT"
          />
        </form>
      </div>
    </div>
  );
}
