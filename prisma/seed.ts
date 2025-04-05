// import { PrismaClient } from "@prisma/client"

// const prisma = new PrismaClient()

// async function main() {
//   // Clear existing articles if needed

//   // Create a single article with all three career sections
//   await prisma.article.create({
//     data: {
//       title: "High-Growth Careers in Renewable Energy and Healthcare",
//       slug: "high-growth-careers-renewable-energy-healthcare",
//       description:
//         "Explore fast-growing career opportunities in renewable energy and healthcare, including wind turbine technicians, solar installers, and nurse practitioners.",
//       coverURL: "/images/growing-careers.jpg", // Replace with actual image URL
//       type: "career",
//       published: true,
//       headline: true,
//       content: {
//         blocks: [
//           {
//             type: "title",
//             level: 1,
//             content: "High-Growth Careers in Renewable Energy and Healthcare",
//           },

//           // Wind Turbine Technician Section
//           {
//             type: "subtitle",
//             level: 2,
//             content: "Wind Turbine Technician",
//           },
//           {
//             type: "bulletList",
//             items: ["Median Pay (2023): $61,770/year", "Job Growth (2023-33): +60% (much faster than average)"],
//           },
//           {
//             type: "paragraph",
//             content:
//               "Wind turbine technicians, or windtechs, play a vital role in the renewable energy sector by maintaining and repairing wind turbines. These technicians work on mechanical, electrical, and hydraulic systems, ensuring turbines run efficiently and reliably. Their work often involves climbing towers that can reach 200 feet or more, performing tasks such as routine maintenance, troubleshooting, and replacing faulty components.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "How to Become One",
//           },
//           {
//             type: "paragraph",
//             content:
//               "Windtechs typically need a postsecondary nondegree award in wind energy technology, often obtained through technical schools or community colleges. Training includes hands-on experience with turbines and specialized skills like tower climbing and safety procedures. After being hired, most technicians receive additional on-the-job training.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Why It's Growing",
//           },
//           {
//             type: "paragraph",
//             content:
//               "With the rise in demand for clean energy, particularly wind power, the job market for wind turbine technicians is booming. From 2023 to 2033, the occupation is projected to grow by 60%, adding about 6,800 new jobs annually. This growth is driven by the expansion of wind farms and the ongoing need to maintain and service existing turbines.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Salary",
//           },
//           {
//             type: "paragraph",
//             content:
//               "The median annual wage for wind turbine technicians is $61,770, with top earners making over $90,000. Technicians working in certain industries, like machinery wholesale or power generation, can earn even higher wages.",
//           },
//           {
//             type: "paragraph",
//             content:
//               "This physically demanding yet rewarding career is ideal for those passionate about renewable energy, enjoy working outdoors, and are comfortable with heights.",
//           },

//           // Solar Photovoltaic Installer Section
//           {
//             type: "subtitle",
//             level: 2,
//             content: "Solar Photovoltaic Installer",
//           },
//           {
//             type: "bulletList",
//             items: ["Median Pay (2023): $48,800/year", "Job Growth (2023-33): +48% (much faster than average)"],
//           },
//           {
//             type: "paragraph",
//             content:
//               "Solar photovoltaic (PV) installers assemble, install, and maintain systems that convert sunlight into electricity. These workers often work outdoors, installing solar panels on rooftops or in large-scale solar farms, and sometimes connecting the systems to the electrical grid. The role involves measuring, cutting, and securing panels, as well as troubleshooting any system issues.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "How to Become One",
//           },
//           {
//             type: "paragraph",
//             content:
//               "To become a PV installer, a high school diploma is typically required, though some workers take courses at technical schools. On-the-job training usually lasts between one month and a year, with some gaining experience through apprenticeships. Certification is optional but demonstrates expertise and may be required for certain projects.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Why It's Growing",
//           },
//           {
//             type: "paragraph",
//             content:
//               "The demand for solar energy is increasing, with job growth projected at 48% over the next decade. As the cost of solar panels drops, more homes and businesses are adopting solar systems, creating a need for skilled installers. About 4,100 openings for solar PV installers are expected each year, driven by both industry growth and the need to replace retiring workers.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Salary",
//           },
//           {
//             type: "paragraph",
//             content:
//               "The median salary for solar photovoltaic installers is $48,800, with top earners making over $73,000 annually. Technicians working for utilities or electrical contractors tend to earn slightly higher wages.",
//           },
//           {
//             type: "paragraph",
//             content:
//               "This career offers an exciting opportunity for those interested in renewable energy, outdoor work, and hands-on problem-solving.",
//           },

//           // Nurse Practitioners Section
//           {
//             type: "subtitle",
//             level: 2,
//             content: "Nurse Practitioners",
//           },
//           {
//             type: "paragraph",
//             content:
//               "Nurse anesthetists, nurse midwives, and nurse practitioners (APRNs) provide essential healthcare services and are in high demand. These roles offer opportunities in both primary and specialty care, with responsibilities ranging from administering anesthesia and delivering babies to diagnosing and treating various conditions.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Key Responsibilities",
//           },
//           {
//             type: "bulletList",
//             items: [
//               "Nurse Anesthetists (CRNAs): Administer anesthesia during surgeries and monitor patient vital signs.",
//               "Nurse Midwives (CNMs): Provide prenatal care, assist in labor and delivery, and offer women's health services.",
//               "Nurse Practitioners (NPs): Provide primary and specialty care, diagnose conditions, and prescribe medications.",
//             ],
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Work Environment",
//           },
//           {
//             type: "paragraph",
//             content:
//               "APRNs work in hospitals, outpatient centers, and physician offices. Most work full-time, with some required to work nights, weekends, or be on-call. The job can be physically demanding but offers a rewarding experience helping patients.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Education and Certification",
//           },
//           {
//             type: "paragraph",
//             content:
//               "APRNs need at least a master's degree in nursing and must pass national certification exams. Nurse anesthetists, for example, require one year of critical care experience before entering their programs. Certification varies by role, and periodic recertification is needed.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Salary and Job Outlook",
//           },
//           {
//             type: "paragraph",
//             content:
//               "The median annual wage for APRNs was $129,480 in 2023. Nurse anesthetists earn higher wages, with a median of $212,650. Employment for APRNs is projected to grow by 40% from 2023 to 2033, driven by the aging population and increasing demand for healthcare services.",
//           },
//           {
//             type: "subtitle",
//             level: 3,
//             content: "Skills for Success",
//           },
//           {
//             type: "paragraph",
//             content:
//               "APRNs must have strong communication, critical thinking, and leadership skills. They must be detail-oriented, compassionate, and able to make quick decisions to ensure the best patient care.",
//           },
//         ],
//       },
//     },
//   })

//   console.log("Database has been seeded!")
// }

// main();

