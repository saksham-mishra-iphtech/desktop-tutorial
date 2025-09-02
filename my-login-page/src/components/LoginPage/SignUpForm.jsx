// import React from "react";
// import { useState } from "react";
// import { InputField } from "./InputField";
// import { Button } from "./Button";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { signup } from "../../features/login/LoginSlice";

// const SignUpForm = ({ toggleform, onSignupSuccess }) => {

// const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const [showPassword, setshowPassword] = useState(false);
//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       phoneNo: "",
//       password: "",
//       confirmPassword:"",
//       dob: "",
//       gender: "",
//       address:"",
//       city:"",
//       country:"",
//       state:"",
//       bio:"",
//       username:"",
//       termsAccepted: false,

//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Required").max(20, " "),
//       email: Yup.string().email("Invalid Email").required("Required"),
//       phoneNo: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Required"),
//       password: Yup.string()
//         .matches(
//           passwordRegex,
//           "Password must include at least 8 characters with one lowercase, uppercase, number, and special symbol"
//         )
//         .required("Required"),
//         confirmPassword: Yup.string()
//          .oneOf([Yup.ref("password")], "Passwords must match")
//        .required("Required"),
//       dob: Yup.date()
//         .max(new Date(), "DOB can not be in future")
//         .max(
//           new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
//           "Age must be atleast 18 year old"
//         )
//         .required("Required"),
//       gender: Yup.string()
//         .oneOf(["male", "female", "other"], "Invalid gender")
//         .required("Required"),
//         address: Yup.string().required("Required"),
//       city: Yup.string().required("Required"),
//       state: Yup.string().required("Required"),
//       bio: Yup.string().required("Required"),
//       country: Yup.string().required("Required"),
//       username: Yup.string().required("Required"),
//       termsAccepted: Yup.boolean()
//         .oneOf([true], "Required")
//         .required("Required"),
//     }),
// onSubmit: (values) => {

//   // const newUser ={ name, email, password };
//   dispatch(signup(values));
//   onSignupSuccess();
//   navigate("/dashboard");
// },
//   });

//   return (
//     <div className="bg-white px-6 w-full max-w-[90%] sm:max-w-md mx-auto">
//       <h2 className="text-center text-2xl font-bold text-black pb-9 mt-10">
//         Create Your Account
//       </h2>
//       <form onSubmit={formik.handleSubmit}>
//         <div className=" text-gray-700">
//           {/* Name Input */}
//           <div className="flex flex-col">
//             <InputField
//               label="Name"
//               name="name"
//               type="text"
//               placeholder="Enter your name"
//               value={formik.values.name}
//               onChange={(e) => {
//                 if (e.target.value.length <= 20) {
//                   formik.handleChange(e);
//                 }
//               }}
//               onBlur={formik.handleBlur}
//             />
//             <div className="min-h-[20px] text-sm text-red-500">
//               {formik.touched.name && formik.errors.name && (
//                 <p>{formik.errors.name}</p>
//               )}
//             </div>
//           </div>

//           {/* Email Input */}
//           <div className="flex flex-col">
//             <InputField
//               label="E-mail Address"
//               name="email"
//               type="email"
//               placeholder="Enter your email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             <div className="min-h-[20px] text-sm text-red-500">
//               {formik.touched.email && formik.errors.email && (
//                 <p>{formik.errors.email}</p>
//               )}
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="flex flex-col relative">
//             <InputField
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             <button
//               type="button"
//               onClick={() => setshowPassword(!showPassword)}
//               className="absolute right-3 top-13 transform -translate-y-1/2 text-gray-600"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </button>
//             <div className="min-h-[20px] text-sm text-red-500">
//               {formik.touched.password && formik.errors.password && (
//                 <p>{formik.errors.password}</p>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* Confirm Password */}
//         <div className="flex flex-col">
//               <InputField label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm your password"
//                 value={formik.values.confirmPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               <div className="text-sm text-red-500">{formik.touched.confirmPassword && formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}</div>
//             </div>

//         <div className="flex flex-col">
//           {/* dob input feild */}
//           <InputField
//             type="date"
//             name="dob"
//             value={formik.values.dob}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="w-full p-2 border border-gray-300 rounded-md cursor-pointer"
//             onFocus={(e) => e.target.showPicker()}
//           />
//           <div className="min-h-[20px] text-sm text-red-500">
//             {formik.touched.dob && formik.errors.dob && (
//               <p>{formik.errors.dob}</p>
//             )}
//           </div>
//         </div>

//         <div className="flex flex-col">
//           <label className="font-semibold mb-1" htmlFor="gender">
//             Gender
//           </label>
//           <select
//             id="Gender"
//             name="gender"
//             value={formik.values.gender}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             className="bordor border-b-2 border-blue-500 rounded-md focus:outline-non focus:ring-2 focus:ring-blue-400 placeholder-gray-500 placeholder:text-[14px]"
//           >
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           <div className="min-h-[20px] text-sm text-red-500">
//             {formik.touched.gender && formik.errors.gender && (
//               <p>{formik.errors.gender}</p>
//             )}
//           </div>
//         </div>
//         <div className="flex flex-col">
//               <InputField label="Address" name="address" type="text" placeholder="Enter your address"
//                 value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//               <div className="text-sm text-red-500">{formik.touched.address && formik.errors.address && <p>{formik.errors.address}</p>}</div>
//             </div>
//             {["city", "state", "country", "bio", "username"].map((field) => (
//               <div key={field} className="flex flex-col">
//                 <InputField label={field.charAt(0).toUpperCase() + field.slice(1)} name={field} type="text" placeholder={`Enter your ${field}`}
//                   value={formik.values[field]} onChange={formik.handleChange} onBlur={formik.handleBlur} />
//                 <div className="text-sm text-red-500">{formik.touched[field] && formik.errors[field] && <p>{formik.errors[field]}</p>}</div>
//               </div>
//             ))}

//         {/* Terms & Conditions Checkbox */}
//         <div className="flex items-center mt-1">
//           <input
//             type="checkbox"
//             name="termsAccepted"
//             id="terms"
//             className="mr-2"
//             checked={formik.values.termsAccepted}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//           />
//           <label
//             htmlFor="terms"
//             className="text-[7px] md:text-sm text-gray-600"
//           >
//             By Signing Up, I agree with{" "}
//             <a href="#" className="text-blue-500">
//               Terms & Conditions
//             </a>
//           </label>
//         </div>
//         <div className="min-h-[20px] text-sm text-red-500">
//           {formik.touched.termsAccepted && formik.errors.termsAccepted && (
//             <p>{formik.errors.termsAccepted}</p>
//           )}
//         </div>

//         {/* Buttons */}
//         <div className="flex md:gap-5">
//           <Button
//             text="Create"
//             isPrimary
//             onClick={formik.handleSubmit}
//             type="submit"
//           />
//           <Button
//             text="Login"
//             type="button"
//             isPrimary
//             onclick={toggleform}

//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignUpForm;





import React, { useState } from "react";
import { Button } from "./Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../../features/login/LoginSlice";
import * as Yup from "yup";
import FloatingLabelInput from "./FloatingLabelInput";
import FloatingLabelSelect from "./FloatingLabelSelect";

const SignUpForm = ({ toggleForm, onSignupSuccess }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const countries = ["India", "USA", "Canada", "Australia", "Germany",
  "Brazil", "France", "Japan", "South Africa", "Mexico"];

const states = {
  India: [
    "Uttar Pradesh", "Delhi", "Maharashtra", "Karnataka", "Tamil Nadu",
    "Rajasthan", "Gujarat", "Bihar", "Punjab", "West Bengal"
  ],
  USA: [
    "California", "Texas", "Florida", "New York", "Illinois",
    "Georgia", "Ohio", "Pennsylvania", "North Carolina", "Michigan"
  ],
  Canada: [
    "Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba",
    "Nova Scotia", "Saskatchewan", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island"
  ],
  // Australia
  Australia: [
    "New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia",
    "Tasmania", "Australian Capital Territory", "Northern Territory", "Gold Coast", "Sunshine Coast"
  ],
  // Germany
  Germany: [
    "Bavaria", "Berlin", "Hamburg", "North Rhine-Westphalia", "Baden-Württemberg",
    "Hesse", "Saxony", "Brandenburg", "Thuringia", "Lower Saxony"
  ],
  // Brazil
  Brazil: [
    "São Paulo", "Rio de Janeiro", "Bahia", "Minas Gerais", "Paraná",
    "Ceará", "Pernambuco", "Rio Grande do Sul", "Amazonas", "Distrito Federal"
  ],
  // France
  France: [
    "Île-de-France", "Provence-Alpes-Côte d'Azur", "Auvergne-Rhône-Alpes", "Nouvelle-Aquitaine", "Occitanie",
    "Grand Est", "Brittany", "Normandy", "Bourgogne-Franche-Comté", "Hauts-de-France"
  ],
  // Japan
  Japan: [
    "Tokyo", "Osaka", "Hokkaido", "Fukuoka", "Aichi",
    "Kyoto", "Hiroshima", "Miyagi", "Kanagawa", "Okinawa"
  ],
  // South Africa
  "South Africa": [
    "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State",
    "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Bloemfontein"
  ],
  // Mexico
  Mexico: [
    "Mexico City", "Jalisco", "Nuevo León", "Puebla", "Guanajuato",
    "Chihuahua", "Veracruz", "Yucatán", "Querétaro", "Sonora"
  ]
};

const cities = {
  // India
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Noida", "Ghaziabad", "Mathura", "Jhansi", "Bareilly"],
  "Delhi": ["New Delhi", "Dwarka", "Saket", "Rohini", "Lajpat Nagar", "Karol Bagh", "Vasant Kunj", "Janakpuri", "Mayur Vihar", "Pitampura"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane", "Aurangabad", "Solapur", "Kolhapur", "Amravati", "Sangli"],
  "Karnataka": ["Bengaluru", "Mysore", "Mangalore", "Hubli", "Belgaum", "Davanagere", "Tumkur", "Ballari", "Shivamogga", "Hassan"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Vellore", "Tirunelveli", "Thoothukudi", "Dindigul"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Kota", "Ajmer", "Alwar", "Sikar", "Bhilwara", "Churu"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Gandhinagar", "Junagadh", "Jamnagar", "Navsari", "Anand"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga", "Purnia", "Arrah", "Begusarai", "Katihar", "Munger"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Batala", "Pathankot", "Moga"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman", "Kharagpur", "Haldia", "Jalpaiguri"],

  // USA
  "California": ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno", "Long Beach", "Oakland", "Bakersfield", "Anaheim"],
  "Texas": ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso", "Arlington", "Plano", "Lubbock", "Irving"],
  "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee", "Fort Lauderdale", "St. Petersburg", "Hialeah", "Gainesville", "Sarasota"],
  "New York": ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse", "Albany", "New Rochelle", "Mount Vernon", "Schenectady", "Utica"],
  "Illinois": ["Chicago", "Aurora", "Naperville", "Joliet", "Rockford", "Springfield", "Peoria", "Elgin", "Waukegan", "Cicero"],
  "Georgia": ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens", "Sandy Springs", "Roswell", "Macon", "Albany", "Johns Creek"],
  "Ohio": ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron", "Dayton", "Parma", "Canton", "Youngstown", "Lorain"],
  "Pennsylvania": ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading", "Scranton", "Bethlehem", "Lancaster", "Harrisburg", "Altoona"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem", "Fayetteville", "Cary", "Wilmington", "High Point", "Concord"],
  "Michigan": ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Ann Arbor", "Lansing", "Flint", "Dearborn", "Livonia", "Troy"],

  // Canada
  "Ontario": ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London", "Markham", "Vaughan", "Kitchener", "Windsor"],
  "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil", "Sherbrooke", "Saguenay", "Levis", "Trois-Rivières", "Terrebonne"],
  "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby", "Richmond", "Abbotsford", "Coquitlam", "Kelowna", "Nanaimo", "Kamloops"],
  "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert", "Medicine Hat", "Grande Prairie", "Airdrie", "Spruce Grove", "Leduc"],
  "Manitoba": ["Winnipeg", "Brandon", "Steinbach", "Thompson", "Portage la Prairie", "Selkirk", "Winkler", "Morden", "Dauphin", "Flin Flon"],
  "Nova Scotia": ["Halifax", "Sydney", "Truro", "New Glasgow", "Glace Bay", "Kentville", "Bridgewater", "Yarmouth", "Amherst", "Antigonish"],
  "Saskatchewan": ["Saskatoon", "Regina", "Prince Albert", "Moose Jaw", "Swift Current", "Yorkton", "North Battleford", "Estevan", "Weyburn", "Humboldt"],
  "New Brunswick": ["Moncton", "Saint John", "Fredericton", "Dieppe", "Miramichi", "Bathurst", "Edmundston", "Campbellton", "Oromocto", "Sackville"],
  "Newfoundland and Labrador": ["St. John's", "Mount Pearl", "Corner Brook", "Gander", "Grand Falls-Windsor", "Happy Valley-Goose Bay", "Labrador City", "Stephenville", "Marystown", "Clarenville"],
  "Prince Edward Island": ["Charlottetown", "Summerside", "Stratford", "Cornwall", "Montague", "Kensington", "Souris", "Alberton", "Georgetown", "Tignish"],

  // Australia
  "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Tamworth", "Albury", "Coffs Harbour", "Wagga Wagga", "Dubbo", "Bathurst", "Orange"],
  "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton", "Mildura", "Warrnambool", "Traralgon", "Wangaratta", "Horsham"],
  "Queensland": ["Brisbane", "Gold Coast", "Cairns", "Townsville", "Toowoomba", "Mackay", "Rockhampton", "Bundaberg", "Hervey Bay", "Gladstone"],
  "Western Australia": ["Perth", "Mandurah", "Bunbury", "Geraldton", "Kalgoorlie", "Albany", "Karratha", "Broome", "Busselton", "Port Hedland"],
  "South Australia": ["Adelaide", "Mount Gambier", "Whyalla", "Gawler", "Port Pirie", "Port Augusta", "Murray Bridge", "Port Lincoln", "Victor Harbor", "Naracoorte"],
  "Tasmania": ["Hobart", "Launceston", "Devonport", "Burnie", "Ulverstone", "Kingston", "New Norfolk", "Wynyard", "George Town", "Sorell"],
  "Australian Capital Territory": ["Canberra", "Belconnen", "Gungahlin", "Tuggeranong", "Woden Valley", "Weston Creek", "Molonglo Valley", "Majura", "Fyshwick", "Narrabundah"],
  "Northern Territory": ["Darwin", "Alice Springs", "Palmerston", "Katherine", "Nhulunbuy", "Tennant Creek", "Jabiru", "Yulara", "Batchelor", ]
};

  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    country: "",
    state: "",
    bio: "",
    username: "",
    termsAccepted: false,
    profileImage: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required").max(20, "Max 20 characters"),
    email: Yup.string().email("Invalid Email").required("Required"),
    phoneNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Must be 10 digits")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Must have 8 chars, one uppercase, one number, one special char"
      )
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
    dob: Yup.date()
      .nullable()
      .transform((value, originalValue) =>
        originalValue === "" ? null : value
      )
      .max(new Date(), "DOB cannot be in the future")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
        "Must be at least 18 years old"
      )
      .required("Required"),

    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Required")
      .required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    bio: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    zipCode: Yup.string().required("Required").min(5,"Must be of minimum five digits"),
    termsAccepted: Yup.boolean().oneOf([true], "Required").required("Required"),
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Submitted! Validating...");
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      // console.log("Form is valid. Dispatching to Redux...");
      setErrors({});
      dispatch(signup(formData));
      onSignupSuccess();
      navigate("/dashboard");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      console.log(" Validation Errors:", newErrors);
    }
  };

  return (
    <div className=" h-full  w-full  mx-auto flex flex-col">
      <h2 className="text-center text-2xl font-bold text-black pb-4 mt-6 ">
        Create Your Account
      </h2>
      <div className="max-h-[520px] md:px-25 md:w-full w-screen  px-5 overflow-y-auto ">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid md:grid-cols-2 grid-cols-1 mt-6 gap-8">
            <FloatingLabelInput
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <FloatingLabelInput
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
            />
            <FloatingLabelInput
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <FloatingLabelInput
              label="Phone No"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              error={errors.phoneNo}
            />
            <div className="relative">
              <FloatingLabelInput
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-3 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="relative ">
              <FloatingLabelInput
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 bottom-3 transform -translate-y-1/2 text-gray-600"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="md:col-span-2">
              <FloatingLabelInput
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                className=""
              />
            </div>

            <FloatingLabelSelect
              label="Country"
              name="country"
              options={countries}
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
            />
            <FloatingLabelSelect
              label="State"
              name="state"
              options={states[formData.country] || []}
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
            />
            <FloatingLabelSelect
              label="City"
              name="city"
              options={cities[formData.state] || []}
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
            />
            <FloatingLabelInput
              label="Zip Code"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              error={errors.zipCode}
            />          
            <FloatingLabelInput
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              error={errors.dob}
            />

            <div className="md:col-span-2">
              <FloatingLabelInput
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                error={errors.bio}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-4 mb-5 text-gray-600">
            <p className="">Gender</p>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
            <ErrorMessage error={errors.gender} />
          </div>

          {/* Terms */}
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              name="termsAccepted"
              className="mr-2"
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            <label className="text-sm text-gray-600">
              I accept the{" "}
              <a href="#" className="text-blue-500">
                Terms & Conditions
              </a>
            </label>
          </div>
          <ErrorMessage error={errors.termsAccepted} />

          {/* Buttons */}
          <div className="flex justify-between gap-3 sticky bottom-0 bg-white py-4 ">
            <div></div>
            <div className="md:hidden">
              <Button text="Login" onClick={toggleForm} />
            </div>
            <Button text="Create" type="submit" isPrimary />
          </div>
        </form>
      </div>
    </div>
  );
};

// Error Message Component
const ErrorMessage = ({ error }) => (
  <div className="text-sm text-red-500 min-h-[20px]">
    {error && <p>{error}</p>}
  </div>
);

export default SignUpForm;
