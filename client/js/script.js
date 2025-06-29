document.addEventListener('DOMContentLoaded', function () {
    // Data for main skills overview
    const skillsData = {
        "Artificial Intelligence & Machine Learning": ["Generative AI", "Artificial Intelligence (AI)", "Google Colab", "Jupyter"],
        "Quality Assurance & Testing": ["Quality Assurance", "Test Automation", "Quality Process Development", "Section 508", "Katalon Studio", "Playwright", "CodeceptJS", "Robot Framework", "WebdriverIO", "Selenium", "Jest", "Postman / Postman API", "Quality Center"],
        "Security": ["Security", "Information Security", "Mobile Security", "Wireshark"],
        "Programming & Scripting": ["Python", "JavaScript", "SQL", "Java", "Shell"],
        "DevOps & Infrastructure": ["Jenkins", "Docker", "GitHub Actions", "Google Cloud Platform (GCP)", "Harness.io"],
        "Platforms & Technologies": ["Mobile Applications", "Android", "React.js", "PostgreSQL"],
        "Monitoring & Analytics": ["Datadog", "Google Analytics"],
        "Process & Project Management": ["SDLC", "Agile Methodologies", "Software Project Management", "Cross-functional Team Leadership", "Jira / JIRA"]
    };
    
    const categoryEmojis = {
        "Artificial Intelligence & Machine Learning": "🧠",
        "Quality Assurance & Testing": "🧪",
        "Security": "🔐",
        "Programming & Scripting": "👨‍💻",
        "DevOps & Infrastructure": "☁️",
        "Platforms & Technologies": "📱",
        "Monitoring & Analytics": "📊",
        "Process & Project Management": "📈"
    };

    const categoryColors = {
        "Artificial Intelligence & Machine Learning": 'bg-purple-100 text-purple-800',
        "Quality Assurance & Testing": 'bg-teal-100 text-teal-800',
        "Security": 'bg-red-100 text-red-800',
        "Programming & Scripting": 'bg-blue-100 text-blue-800',
        "DevOps & Infrastructure": 'bg-orange-100 text-orange-800',
        "Platforms & Technologies": 'bg-indigo-100 text-indigo-800',
        "Monitoring & Analytics": 'bg-green-100 text-green-800',
        "Process & Project Management": 'bg-pink-100 text-pink-800'
    };

    // Data for certifications
    const certificationsData = [
        { name: "GenAI Essentials Certified", issuer: "ExamPro", date: "Apr. 2025" },
        { name: "The Data Scientist's Toolbox", issuer: "John Hopkins University", date: "Oct. 2016" },
        { name: "Certified Application Tester", issuer: "M.I.T. / Accenture Solutions Delivery Academy", date: "Nov. 2009" }
    ];

    // Map from CSV data for job-specific skills (original data)
    const jobSkillsMapOriginal = {
        "Steampunk, Inc. - Test Engineering Team Lead": ["Selenium", "Google Colab", "PostgreSQL", "Harness.io", "Google Cloud Platform (GCP)", "Artificial Intelligence (AI)", "Postman API", "Software Project Management", "Quality Process Development", "Section 508", "Jupyter", "Google Analytics", "Katalon Studio", "Datadog", "Generative AI", "Python"],
        "Sentral - QA Lead": ["SDLC", "JIRA", "JavaScript", "PostgreSQL", "Postman", "Agile Methodologies", "Docker", "Google Cloud Platform (GCP)", "SQL", "Test Automation", "Security", "Information Security", "Playwright", "Generative AI", "Cross-functional Team Leadership"],
        "Clearcover - Senior Quality Engineer / QA Lead": ["SDLC", "JIRA", "JavaScript", "PostgreSQL", "Postman", "Agile Methodologies", "Docker", "Android", "SQL", "Test Automation", "Jest", "Information Security", "Playwright", "Cross-functional Team Leadership"],
        "Flyreel - QA Architect / Scrum Master": ["SDLC", "JIRA", "JavaScript", "Mobile Applications", "PostgreSQL", "Postman", "Agile Methodologies", "Mobile Security", "Software Project Management", "Android", "SQL", "Test Automation", "Security", "Information Security", "CodeceptJS", "GitHub Actions", "Playwright", "Cross-functional Team Leadership"],
        "Rally Health - QA Lead / Software Engineer / Security Advocate": ["SDLC", "Robot Framework", "JIRA", "JavaScript", "Mobile Applications", "Selenium", "PostgreSQL", "Jenkins", "Postman", "Agile Methodologies", "Docker", "Wireshark", "Mobile Security", "Software Project Management", "Android", "SQL", "Test Automation", "WebdriverIO", "Security", "Information Security", "React.js", "Cross-functional Team Leadership", "Python"],
        "Amazon - Quality Assurance Engineer II / QA Manager": ["SDLC", "JIRA", "Mobile Applications", "Agile Methodologies", "Wireshark", "Mobile Security", "Software Project Management", "Android", "SQL", "Test Automation", "Security", "Information Security", "Cross-functional Team Leadership", "Python"],
        "Curb Mobility - Senior Quality Assurance Engineer / QA Lead": ["SDLC", "JIRA", "Mobile Applications", "Jenkins", "Agile Methodologies", "Mobile Security", "Android", "Test Automation", "Information Security", "Cross-functional Team Leadership"],
        "RSA Security - Principal SW Quality Engineer": ["SDLC", "JIRA", "Agile Methodologies", "Mobile Security", "SQL", "Security", "Information Security", "Software Development"],
        "Reality Mobile LLC - Quality Assurance Engineer": ["SDLC", "JIRA", "Mobile Applications", "Jenkins", "Agile Methodologies", "Wireshark", "Mobile Security", "Android", "Test Automation", "Security", "Information Security", "Software Development"],
        "Symantec - SQA Engineer": ["SDLC", "JIRA", "Jenkins", "Agile Methodologies", "Mobile Security", "SQL", "Test Automation", "Security", "Information Security", "Software Development"],
        "Accenture - Software Engineer - Test Analyst - PL/SQL Developer": ["SDLC", "JIRA", "Agile Methodologies", "SQL", "Information Security", "Software Development", "Quality Center"]
    };

    // Mapping for resume job titles/companies to CSV job titles/companies
    const resumeToCsvMapping = {
        "Steampunk-QA Engineering Team Lead - USDA / FEMA National Flood Insurance Program": "Steampunk, Inc. - Test Engineering Team Lead",
        "Sentral-QA Lead - Senrtal.com, and Reservation Lookup": "Sentral - QA Lead",
        "Clearcover-QA Lead Clearcover Car Insurance": "Clearcover - Senior Quality Engineer / QA Lead",
        "Flyreel-QA Architect / Scrum Master - Flyreel AI": "Flyreel - QA Architect / Scrum Master",
        "Rally Health-QA Lead/Software Engineer / Security Advocate": "Rally Health - QA Lead / Software Engineer / Security Advocate",
        "Amazon-Quality Assurance Engineer II / QA Lead": "Amazon - Quality Assurance Engineer II / QA Manager",
        "Taxi Magic (Curb)-Senior Quality Assurance Engineer / QA Lead - Taxi Driver App": "Curb Mobility - Senior Quality Assurance Engineer / QA Lead",
        "RSA, The Security Division of EMC-Principal SW Quality Engineer / Functional QA Lead - RSA, Security Analytics": "RSA Security - Principal SW Quality Engineer",
        "Reality Mobile LLC-SQA Engineer / QA Lead - Reality Vision Analytics": "Reality Mobile LLC - Quality Assurance Engineer",
        "Symantec-SQA Engineer / QA Lead - Managed Security Services": "Symantec - SQA Engineer",
        "Accenture-Software Engineer - Test Analyst / PL/SQL Developer": "Accenture - Software Engineer - Test Analyst - PL/SQL Developer"
    };

    // Experience data for timeline (updated to include associatedSkills)
    const experienceData = [
        {
            company: "Steampunk",
            logo: "assets/img/steampunk.png",
            title: "QA Engineering Team Lead - USDA / FEMA National Flood Insurance Program",
            date: "Jul. 2023 – Present",
            achievements: [
                "Managed a 4-engineer QA team, establishing processes/tools for a flood insurance policy quote application launch in 7 months.",
                "Built and maintained 200+ data-driven API tests (Postman), ensuring seamless integration.",
                "Developed Katalon and Axe Dev Tools proficiency, then trained the team in functional, regression, automation, and 508 accessibility testing.",
                "Led performance testing, guiding coverage, automating nightly/weekly runs, and delivering actionable reports.",
                "Constructed a Jupyter notebook (Google Colab) to process thousands of rows of address data, improving coverage by 30%.",
                "Led comprehensive audit of QA practices across 12 app dev teams, identifying gaps for Release-on-Demand readiness."
            ]
        },
        {
            company: "Sentral",
            logo: "assets/img/sentral.png",
            title: "QA Lead - Senrtal.com, and Reservation Lookup",
            date: "Apr. 2022 – Mar. 2023",
            achievements: [
                 "Developed and executed test plans, cases, and scenarios (Playwright, Postman) for website/backend, automating testing and increasing efficiency.",
                 "Implemented continuous integration and monitoring (ChecklyHQ) for real-time alerting and software stability.",
                 "Administered JIRA (workflows, automation, release management) and facilitated scrum ceremonies."
            ]
        },
        {
            company: "Clearcover",
            logo: "assets/img/clearcover.png",
            title: "QA Lead Clearcover Car Insurance",
            date: "Aug. 2021 – Apr. 2022",
            achievements: [
                "Wrote automated acceptance data-driven tests using Playwright, Jest, Postman, and CodeceptJS.",
                "Initiated root-cause analysis, identifying opportunities to improve development processes.",
                "Facilitated migration to a new test case management tool, providing traceability and a holistic view of test coverage."
            ]
        },
         {
            company: "Flyreel",
            logo: "assets/img/flyreel.png",
            title: "QA Architect / Scrum Master - Flyreel AI",
            date: "Jan. 2021 – Aug. 2021",
            achievements: [
                "Implemented test management tool, automation frameworks, and CI/CD pipeline (GitHub Actions) with JIRA/Slack integrations.",
                "Configured automated API tests (ChecklyHQ) for performance insights and rapid regression identification.",
                "Created mobile automated tests (TestProject) from scratch, achieving 90% Android test coverage (previously manual) and reducing regression time by 2 days."
            ]
        },
        {
            company: "Rally Health",
            logo: "assets/img/rally-health.png",
            title: "QA Lead/Software Engineer / Security Advocate",
            date: "Feb. 2015 – Jan. 2021",
            achievements: [
                "Developed automated UI and API tests (Robot Framework, WebdriverIO), utilizing Jenkins for continuous integration.",
                "As Security Advocate, developed/maintained threat model and leveraged OWASP ZAP to identify vulnerabilities before weekly releases.",
                "Collaborated with Developers on full-stack bug fixes, verifying front and back-end features upstream."
            ]
        },
         {
            company: "Amazon",
            logo: "assets/img/amazon.png",
            title: "Quality Assurance Engineer II / QA Lead",
            date: "Mar. 2014 – Feb. 2015",
            achievements: [
                "Collaborated on test coverage, ensuring successful delivery of multiple large-scale Appstore and Amazon Mobile Android client releases.",
                "Responsible for feature scoping, test planning, test case creation, end-to-end testing, and driving test automation implementation.",
                "Delegated tasks, reported test results, and championed quality throughout development."
            ]
        },
        {
            company: "Taxi Magic (Curb)",
            logo: "assets/img/curb.png",
            title: "Senior Quality Assurance Engineer / QA Lead - Taxi Driver App",
            date: "Aug. 2013 – Mar. 2014",
            achievements: [
                "Collaborated with Engineers to develop manual and automated acceptance tests, mitigating bugs pre-deployment.",
                "Initiated field tests with different teams to analyze application in real-world scenarios."
            ]
        },
        {
            company: "RSA, The Security Division of EMC",
            logo: "assets/img/rsa.png",
            title: "Principal SW Quality Engineer / Functional QA Lead - RSA, Security Analytics",
            date: "Apr. 2013 – Aug. 2013",
            achievements: [
                "Developed test plans, functional test cases, and requirements traceability matrices.",
                "Prioritized and delegated tasks for geographically dispersed QA team."
            ]
        },
        {
            company: "Reality Mobile LLC",
            logo: "assets/img/reality-mobile.png",
            title: "SQA Engineer / QA Lead - Reality Vision Analytics",
            date: "Dec. 2011 – Apr. 2013",
            achievements: [
                "Conducted device certification tests (iOS, Android, Windows Mobile, BlackBerry).",
                "Developed and executed automated Android tests (Robotium - JavaScript).",
                "Performed penetration tests (man-in-the-middle) to ensure VOIP/XMPP encryption."
            ]
        },
        {
            company: "Symantec",
            logo: "assets/img/symantec.png",
            title: "SQA Engineer / QA Lead - Managed Security Services",
            date: "Nov. 2010 – Dec. 2011",
            achievements: [
                "Developed, maintained, and executed test plans and scenarios; provided summary reports.",
                "Conducts security assessments (Cenzic Hailstorm) to evaluate the security posture of the Managed Security Services management web application."
            ]
        },
        {
            company: "Accenture",
            logo: "assets/img/accenture.png",
            title: "Software Engineer - Test Analyst / PL/SQL Developer",
            date: "Apr. 2007 – Nov. 2010",
            achievements: [
                "Prepared and reviewed deliverables (test cases, conditions, scripts, data) with clients.",
                "Developed stored procedures in PL/SQL, tested assigned code modules, supported product and system tests, and performed bug fixes as needed."
            ]
        }
    ];

    // Projects data
    const projectsData = [
        {
            title: "AI-Powered Test Case Generator",
            description: "Developed a tool leveraging generative AI to automatically create test cases from requirements, significantly speeding up the test design phase.",
            githubPageLink: "https://github.com/your-username/ai-test-generator", // Placeholder
            imagePlaceholder: "https://placehold.co/400x250/06B6D4/FFFFFF?text=AI+Test",
            skillsUsed: ["Generative AI", "Python", "Jupyter", "Quality Assurance", "Test Automation"]
        },
        {
            title: "DevSecOps Pipeline Automation",
            description: "Implemented a robust CI/CD pipeline integrated with security scans, ensuring faster and more secure software deployments.",
            githubPageLink: "https://github.com/your-username/devsecops-pipeline", // Placeholder
            imagePlaceholder: "https://placehold.co/400x250/6366F1/FFFFFF?text=DevSecOps",
            skillsUsed: ["GitHub Actions", "Jenkins", "Docker", "Security", "Test Automation", "SDLC"]
        },
        {
            title: "Formula 1 RAG chatbot",
            description: "Built a chatbot using ElasticSearch and LLMs to provide information about Formula 1 teams and drivers.",
            githubPageLink: "https://github.com/grob3/elasticRagF1", 
            imagePlaceholder: "https://placehold.co/400x250/F97316/FFFFFF?text=Mobile+Perf",
            skillsUsed: ["Web Applications", "ElasticSearch", "Python", "Jupyer"]
        },
         {
            title: "Automated API Testing Framework",
            description: "Created a scalable API testing framework using Postman and Playwright to validate backend services with data-driven tests.",
            githubPageLink: "https://github.com/your-username/api-testing-framework", // Placeholder
            imagePlaceholder: "https://placehold.co/400x250/22C55E/FFFFFF?text=API+Testing",
            skillsUsed: ["Postman / Postman API", "Playwright", "Test Automation", "JavaScript", "SQL"]
        },
        {
            title: "Cloud Migration Quality Checks",
            description: "Designed and executed quality assurance checks for applications migrating to Google Cloud Platform, ensuring data integrity and functionality.",
            githubPageLink: "https://github.com/your-username/cloud-qa", // Placeholder
            imagePlaceholder: "https://placehold.co/400x250/EF4444/FFFFFF?text=Cloud+QA",
            skillsUsed: ["Google Cloud Platform (GCP)", "Quality Assurance", "Information Security", "SDLC", "Docker"]
        }
    ];


    // Populate associatedSkills for each job using the original map
    experienceData.forEach(job => {
        const mapKey = resumeToCsvMapping[`${job.company}-${job.title}`];
        job.associatedSkills = jobSkillsMapOriginal[mapKey] || [];
    });

    // Pre-process skillToCompaniesMap for skill hover
    const skillToCompaniesMap = {};
    // Initialize skillToCompaniesMap with all skills from skillsData
    for (const category in skillsData) {
        skillsData[category].forEach(skill => {
            skillToCompaniesMap[skill] = new Set();
        });
    }

    // Iterate through experienceData to populate skillToCompaniesMap
    experienceData.forEach(job => {
        const companyName = job.company;
        job.associatedSkills.forEach(skill => {
            // Normalize skill name if needed (e.g., 'Python (Programming Language)' to 'Python')
            const normalizedSkill = skill === 'Python (Programming Language)' ? 'Python' : skill;

            // Only add company if the skill is defined in the main skillsData
            let foundInMainSkills = false;
            for (const category in skillsData) {
                if (skillsData[category].includes(normalizedSkill)) {
                    foundInMainSkills = true;
                    break;
                }
            }

            if (foundInMainSkills) {
                if (!skillToCompaniesMap[normalizedSkill]) {
                    skillToCompaniesMap[normalizedSkill] = new Set();
                }
                skillToCompaniesMap[normalizedSkill].add(companyName);
            }
        });
    });

    // Manually add/update specific skill-company associations
    if (!skillToCompaniesMap["Python"]) skillToCompaniesMap["Python"] = new Set();
    skillToCompaniesMap["Python"].add("Rally Health");

    if (!skillToCompaniesMap["Java"]) skillToCompaniesMap["Java"] = new Set();
    skillToCompaniesMap["Java"].add("Amazon");

    if (!skillToCompaniesMap["Shell"]) skillToCompaniesMap["Shell"] = new Set();
    skillToCompaniesMap["Shell"].add("Rally Health");
    skillToCompaniesMap["Shell"].add("Amazon");


    // Convert Sets to Arrays and sort companies
    for (const skill in skillToCompaniesMap) {
        skillToCompaniesMap[skill] = Array.from(skillToCompaniesMap[skill]).sort();
    }

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Skills Population
    const skillsGrid = document.getElementById('skills-grid');
    const skillTooltip = document.getElementById('skill-tooltip');

    for (const categoryName in skillsData) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'bg-gray-50 p-4 rounded-lg shadow-sm';
        
        const categoryHeader = document.createElement('h3');
        categoryHeader.className = 'font-bold text-lg mb-3 text-gray-700 flex items-center';
        categoryHeader.innerHTML = `${categoryEmojis[categoryName] || ''} <span class="ml-2">${categoryName}</span>`;
        categoryDiv.appendChild(categoryHeader);

        const skillsContainer = document.createElement('div');
        skillsContainer.className = 'flex flex-wrap gap-2';
        
        skillsData[categoryName].forEach(skill => {
            const skillTag = document.createElement('span');
            const colorClass = categoryColors[categoryName] || 'bg-gray-200 text-gray-800';
            skillTag.className = `text-sm font-medium px-3 py-1 rounded-full ${colorClass} cursor-pointer`;
            skillTag.textContent = skill;
            skillTag.dataset.skill = skill; // Store skill name for lookup
            
            skillTag.addEventListener('mouseover', (event) => {
                const hoveredSkill = event.target.dataset.skill;
                const companies = skillToCompaniesMap[hoveredSkill];
                if (companies && companies.length > 0) {
                    skillTooltip.innerHTML = `<strong>Used at:</strong><br>${companies.join('<br>')}`; // Display each company on new line
                    
                    const rect = event.target.getBoundingClientRect();
                    const skillsGridRect = skillsGrid.getBoundingClientRect();
                    
                    // Position the tooltip relative to the skillsGrid container
                    skillTooltip.style.left = `${rect.left - skillsGridRect.left + (rect.width / 2)}px`;
                    skillTooltip.style.top = `${rect.bottom - skillsGridRect.top + 10}px`; // 10px below the tag
                    skillTooltip.style.transform = `translateX(-50%)`; // Center horizontally
                    skillTooltip.classList.add('active');
                }
            });

            skillTag.addEventListener('mouseout', () => {
                skillTooltip.classList.remove('active');
            });

            skillsContainer.appendChild(skillTag);
        });
        categoryDiv.appendChild(skillsContainer);
        skillsGrid.appendChild(categoryDiv);
    }

    // Timeline Population
    const timelineContainer = document.getElementById('timeline-container');
    experienceData.forEach((job, index) => {
        const itemHTML = `
            <div class="mb-8 flex md:justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}">
                <div class="order-1 md:w-5/12"></div>
                <div class="z-20 flex items-center order-1 company-marker">
                    <img src="${job.logo}" alt="${job.company} Logo">
                </div>
                <div class="order-1 bg-white rounded-lg shadow-xl w-full md:w-5/12 px-6 py-4 cursor-pointer timeline-item-header">
                    <h3 class="font-bold text-gray-800 text-lg">${job.company}</h3>
                    <p class="text-sm font-medium leading-snug tracking-wide text-gray-600">${job.title}</p>
                    <p class="text-sm text-gray-500 mt-1">${job.date}</p>
                    <div class="timeline-item-content mt-4 text-left">
                        <ul class="list-disc list-inside space-y-2 text-gray-600">
                            ${job.achievements.map(a => `<li>${a}</li>`).join('')}
                        </ul>
                        ${job.associatedSkills && job.associatedSkills.length > 0 ? `
                        <div class="mt-4 pt-4 border-t border-gray-200">
                            <p class="font-semibold text-gray-700 mb-2">Skills Used:</p>
                            <div class="flex flex-wrap gap-2">
                                ${job.associatedSkills.map(skill => `<span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">${skill}</span>`).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>`;
        timelineContainer.innerHTML += itemHTML;
    });
    
    document.querySelectorAll('.timeline-item-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.querySelector('.timeline-item-content');
            content.classList.toggle('open');
        });
    });

    // Projects Population
    const projectsGrid = document.getElementById('projects-grid');
    projectsData.forEach(project => {
        const projectHTML = `
            <div class="bg-gray-50 p-6 rounded-xl shadow-sm flex flex-col h-full">
                <img src="${project.imagePlaceholder}" alt="${project.title} snapshot" class="w-full h-auto rounded-lg mb-4 object-cover">
                <h3 class="font-bold text-lg mb-2 text-gray-800">${project.title}</h3>
                <p class="text-sm text-gray-600 mb-4 flex-grow">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${project.skillsUsed.map(skill => `<span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-gray-200 text-gray-800">${skill}</span>`).join('')}
                </div>
                <a href="${project.githubPageLink}" target="_blank" class="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-md text-center transition">View Project</a>
            </div>
        `;
        projectsGrid.innerHTML += projectHTML;
    });

    // Certifications Population
    const certsContainer = document.getElementById('certifications-container');
    certificationsData.forEach(cert => {
        const certHTML = `
            <div>
                <p class="font-semibold text-blue-600">${cert.name}</p>
                <p class="text-gray-600">${cert.issuer}</p>
                <p class="text-sm text-gray-500">${cert.date}</p>
            </div>`;
        certsContainer.innerHTML += certHTML;
    });

    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        }
    });

    
});
