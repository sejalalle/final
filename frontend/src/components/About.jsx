import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const awardsData = [
  {
    year: "2023",
    title: "Packaging Company of the Year – Large Volume",
    description: "Awarded by PrintWeek for excellence in packaging.",
  },
  {
    year: "2022",
    title: "Best Packaging Printer of the Year",
    description: "Recognized at National Award for Excellence in Printing.",
  },
  {
    year: "2021",
    title: "IFCA Star Awards",
    description: "Honored for innovative packaging solutions.",
  },
  {
    year: "2019",
    title: "SIES SOP Star Award",
    description: "Awarded for excellence in packaging.",
  },
  {
    year: "2017",
    title:  "India Star Award- Recognition of Excellence in Packaging in India ",
    description: "Awarded for excellence in packaging and IFCA Star Awards.",
  },
];

const AwardsSection = () => (
  <section id="awards" className="py-16 bg-[#FAF3E0]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#3B185F] mb-8 sm:mb-12">
        Awards and Recognitions
      </h2>

      <div className="relative border-l-4 border-[#3B185F] pl-4 sm:pl-6">
        {awardsData.map((award, index) => (
          <div
            key={index}
            className="mb-6 sm:mb-10 relative group transition-all duration-300 ease-in-out hover:scale-105"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[18px] sm:-left-[22px] top-2 w-5 h-5 sm:w-6 sm:h-6 bg-[#3B185F] rounded-full border-4 border-white group-hover:scale-125 transition-transform duration-300"></div>

            {/* Award Details */}
            <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#3B185F]">{award.year}</h3>
              <h4 className="font-semibold text-gray-800 text-base sm:text-lg">{award.title}</h4>
              <p className="text-sm sm:text-base text-gray-600">{award.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const clientsData = [
  { 
    image: "/images/image3.webp", 
    name: "1997",
    description: "McDonald's Outstanding Supplier Award."
  },
  { 
    image: "/images/image20.jpg", 
    name: "2008",
    description: "Certificate of Appreciation from Unilever India for speed of execution, flexibility in Solutions and innovation support ."
  },
  { 
    image: "/images/image21.jpg", 
    name: "2009",
    description: "L'Oreal Outstanding Supplier Award."
  },
  { 
    image: "/images/image22.png", 
    name: "2010",
    description: "McDonald's Award for Leadership Excellence."
  },
  { 
    image: "/images/image23.png", 
    name: "2011",
    description: "Godrej Consumer Products Ltd. Best Supplier Award."
  },
  { 
    image: "/images/image24.jpg", 
    name: "2014",
    description: "Certificate of Appreciation from Mondelez for continuous Support and effort in Innovation and New Launches."
  },
];

const ClientsSection = () => (
  <section id="client" className="py-16 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-center mb-6 sm:mb-8">Our Clients</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {clientsData.map((client, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center text-center py-4">
            <img src={client.image} alt={client.name} className="h-16 sm:h-20 w-auto mb-3 sm:mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-[#3B185F]">{client.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 px-2">{client.description}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

function About() {
  return (
    <div className="bg-gray-50 mt-20">
      <section className="relative bg-gradient-to-r from-blue-500 to-pink-500 text-white py-12 sm:py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-400 skew-y-3 transform origin-top"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-8 mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">About Us</h1>
            <p className="text-base sm:text-lg leading-relaxed">
              At Parksons Packaging, we craft innovative solutions for your packaging needs.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src="/images/about2.png" alt="About Us" className="rounded-lg shadow-md w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section id="company-background" className="relative py-12 sm:py-16 bg-white">
        <div className="absolute top-0 left-0 w-full h-full bg-blue-100 -skew-y-3 transform origin-top"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <h2 className="text-blue-700 uppercase font-semibold text-sm tracking-wide mb-2">
            Company Background
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 leading-tight mb-4">
                A pioneering global packaging solutions provider
              </h1>
            </div>
            <div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                Parksons Group has more than 60 years of experience in the printing and packaging industry. 
                Starting as an offset commercial printer and playing cards manufacturer, Parksons Packaging 
                was incorporated in 1996 to focus on the packaging industry.
              </p>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 text-gray-600 leading-relaxed text-sm sm:text-base">
            <p>
              Today, Parksons is a global packaging solutions provider. Led by Ramesh Kejriwal as Chairman, 
              Siddharth Kejriwal as Managing Director, and Chaitanya Kejriwal as Joint Managing Director, 
              we continue to meet the ever-increasing global packaging demand across multiple sectors. 
              With 12 state-of-the-art sites across India, a facility in Tanzania, and a marketing office in Belgium, 
              we are at the forefront of the industry.
            </p>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section id="our-journey" className="relative py-12 sm:py-16 bg-gradient-to-r from-blue-500 to-pink-500 text-white">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-200 to-pink-300 skew-y-3 transform origin-bottom"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Our Journey Throughout the Decades!</h2>
          <div className="flex gap-4 sm:gap-8 overflow-x-auto py-6 sm:py-8 pb-4 -mx-4 px-4">
            {[
              { year: "1996", description: "Incorporated to focus on the packaging industry." },
              { year: "2001", description: "Set up the first dedicated plant in Daman." },
              { year: "2005", description: "First to introduce UV printing in India." },
              { year: "2007", description: "New plant established in Chakan, Pune." },
              { year: "2010", description: "Expanded to North India with a plant in Pantnagar." },
              { year: "2013", description: "Started manufacturing sustainable gable-top cartons." },
            ].map((item, index) => (
              <div
                key={index}
                className="min-w-[240px] sm:min-w-[300px] bg-white text-blue-900 rounded-lg shadow-md p-4 flex flex-col items-center justify-center hover:scale-105 transform transition duration-300"
              >
                <h3 className="text-lg sm:text-xl font-bold">{item.year}</h3>
                <p className="mt-2 text-gray-700 text-sm sm:text-base text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Team Section */}
      <section id="management-team" className="py-12 sm:py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-blue-900 mb-8 sm:mb-12">
            Management Team
          </h2>

          {/* Grid Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10">
            {[
              {
                name: "Ramesh Kejriwal",
                title: "Chairman",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Ramesh-Kejriwal.png",
                description:
                  "An industry veteran with 50+ years in printing & packaging. A visionary who brought several new technologies to India.",
              },
              {
                name: "Siddharth Kejriwal",
                title: "Managing Director",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Siddharth-Kejriwal.jpg",
                description:
                  "Spearheading Parksons since 1996, responsible for strategic initiatives & long-term company vision.",
              },
              {
                name: "Chaitanya Kejriwal",
                title: "Joint Managing Director",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Chaitanya-Kejriwal.png",
                description:
                  "Plays a crucial role in growth & innovation in the packaging industry at Parksons.",
              },
              {
                name: "Amit Taneja",
                title: "Chief Operating Officer",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/08/Mask-Group-158.png",
                description:
                  "Leads operations, ensuring service excellence & operational efficiency at Parksons.",
              },
              {
                name: "Manoj Jaju",
                title: "Chief Financial Officer",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Manoj-Jaju.png",
                description:
                  "Oversees financial strategies and growth at Parksons, ensuring financial excellence.",
              },
              {
                name: "Sabyasachi Chakraborty Thakur",
                title: "Chief Information Officer",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Sabyasachi-Chakraborty-Thakur.png",
                description:
                  "Driving digital transformation projects for rapid company growth since 2017.",
              },
              {
                name: "Vivek Kulkarni",
                title: "Chief Human Resource Officer",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Vivek-Kulkarni.png",
                description:
                  "HR leader with 23+ years of experience, specializes in personnel management.",
              },
              {
                name: "Shailesh Potdar",
                title: "Chief Marketing & Sales Officer – Branded",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Shailesh-Potdar.png",
                description:
                  "Expert in sales & marketing with 25+ years of industry experience.",
              },
              {
                name: "Srikanth Ramamurthy",
                title: "Vice-President, Liquid Packaging Business",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/08/Mask-Group-108.png",
                description:
                  "Srikanth Ramamurthy is the Vice-President of the Liquid Packaging Business at Parksons Packaging, leading the company's initiatives in this sector.",
              },
              {
                name: "Ravindra Patil",
                title: "Vice-President, Marketing & Sales– Health Care & Exports",
                image: "https://parksonspackaging.com/wp-content/uploads/2024/01/Ravindra_Patil.png",
                description:
                  "Ravindra Patil serves as the Vice-President of Marketing & Sales for Health Care & Exports, driving the company's growth in these critical areas.",
              },
              {
                name: "Unnati Divecha Patel",
                title: "Vice President, General Counsel",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/10/Unnati-Divecha-Patel.png",
                description:
                  "Unnati has close to ten years of work experience and is enrolled with the Bar Council of Maharashtra and Goa. She holds a dual degree in BBA.LLB from Symbiosis Law School, Pune.",
              },
              {
                name: "Ramamurthy Madanraj",
                title: "General Manager- Marketing & Sales - Healthcare",
                image: "https://parksonspackaging.com/wp-content/uploads/2023/11/Ramamurthy-Madanraj-.png",
                description:
                  "Madan joined Parksons in 2022, where he heads the Healthcare vertical. A veteran in the packaging business, he holds a PG Diploma in Sales & Marketing and has over 29 years of experience in the packaging industry.",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 sm:p-6 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-3"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full border-4 border-blue-200 shadow-md mb-3 sm:mb-4"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-blue-900">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2 text-sm sm:text-base">{member.title}</p>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognitions */}
      <AwardsSection />

      {/* Clients (Slider) */}
      <ClientsSection />
    </div>
  );
}

export default About;