// CREATE HELPER FUNCTIONS

function generateElement(type, className, content) {
    const Element = document.createElement(type);
    if (className) Element.setAttribute('class', className);
    if (content) Element.textContent = content;

    return Element;
}

function generateSectioWithTitle(title) {
    const Section = generateElement('section');
    Section.appendChild(generateElement('h5','section_title', title));

    return Section;
}

function generateListItemWithIcon(icon, content, isLink) {
    const Item = document.createElement('li');
    
    const Icon = document.createElement('i');
    Icon.setAttribute('class', icon);
    Item.appendChild(Icon);

    let Content;
    if(isLink) {
        Content = document.createElement('a');
        Content.setAttribute('class', 'description');
        Content.setAttribute('href',`https://${content}`);
        Content.setAttribute('target', '_blank');
        Content.textContent = content;
    } else {
        Content = document.createElement('span');
        Content.setAttribute('class', 'description');
        Content.textContent = content;
    }

    Item.appendChild(Content);

    return Item;
}

function generateList(className, listItems) {
    const List = generateElement('ul', className);

    listItems.map(item => {
        const Item = generateElement('li');
        Item.innerHTML = item;
        List.appendChild(Item);
    });

    return List;
}

function generateListSection(title, className, listItems) {
    
    const Section = generateSectioWithTitle(title);
    const List = generateList(className, listItems);

    Section.appendChild(List);

    return Section;
}

// PERSONAL INFORMATION SECTION

const { firstName, lastName, workTitle, contactAndLinks } = sourceData;

const Header = generateElement('section', 'header');

const PersonalInformation = generateElement('div', 'personal_info');

PersonalInformation.appendChild(generateElement('h2', 'name', `${firstName} ${lastName}`));
PersonalInformation.appendChild(generateElement('h3', 'title', workTitle));

const LinksAndContact = generateElement('ul','links_and_contact');
contactAndLinks.map(item =>
    LinksAndContact.appendChild(
        generateListItemWithIcon(item.icon, item.content, item.isLink)
    ));

PersonalInformation.appendChild(LinksAndContact);
Header.appendChild(PersonalInformation);

const Picture = generateElement('img');
Picture.src = './img/IMG_0257.jpeg';

Header.appendChild(Picture);


// MAIN LAYOUT

const MainLayoutWrapper = generateElement('div', 'main_layout');

const LeftColumnWrapper = generateElement('div', 'left_column');
MainLayoutWrapper.appendChild(LeftColumnWrapper);

const RightColumnWrapper = generateElement('div', 'right_column');
MainLayoutWrapper.appendChild(RightColumnWrapper);

// SUMMARY

const { summary } = sourceData;

const Summary = generateSectioWithTitle("Summary");

const SummaryContent = generateElement('p', 'summary');
SummaryContent.innerHTML = summary;
Summary.appendChild(SummaryContent);

LeftColumnWrapper.appendChild(Summary);

// WORK EXPERIENCE

const { workHistory } = sourceData;

const WorkExperience = generateSectioWithTitle("Experience");

workHistory.map(workHistoryItem => {

    const { start, end, title, company, location, description, pdfPageBreakAfter } = workHistoryItem;
    
    const Item = generateElement('div', 'work_experience_item');
    Item.appendChild(generateElement('h6','position', title));
    Item.appendChild(generateElement('div','company_name', company));

    const TimeAndLocation = generateElement('ul', 'time_and_location');
    TimeAndLocation.appendChild(generateListItemWithIcon('fa-regular fa-calendar-days', `${start} - ${end}`));
    TimeAndLocation.appendChild(generateListItemWithIcon('fa-solid fa-location-dot', location));
    
    Item.appendChild(TimeAndLocation);

    const JobDescription = generateElement('ul', 'description');
    description.map(descriptionItem => JobDescription.appendChild(generateElement('li', null, descriptionItem)));
    /*description.map(descriptionItem => 
        Array.isArray(descriptionItem)
            ? JobDescription.appendChild(generateElement('li', 'html2pdf__page-break bottom_margin', descriptionItem[0]))
            : JobDescription.appendChild(generateElement('li', null, descriptionItem))
    );*/
    Item.appendChild(JobDescription)

    WorkExperience.appendChild(Item);
});

LeftColumnWrapper.appendChild(WorkExperience);

// EDUCATION

const { education } = sourceData;

const Education = generateSectioWithTitle("Education");

education.map(educationItem => {

    const { start, end, title, school, speciality } = educationItem;
    
    const Item = generateElement('div', 'education_item');
    Item.appendChild(generateElement('h5', 'school', school));

    const SpecializationAndSchool = generateElement('h6', 'speciality');
    SpecializationAndSchool.innerHTML = speciality;
    Item.appendChild(SpecializationAndSchool);
    
    const Time = generateElement('ul', 'time_and_location');
    Time.appendChild(generateListItemWithIcon('fa-regular fa-calendar-days', `${start} - ${end}`));
    Item.appendChild(Time);

    Education.appendChild(Item);
});

LeftColumnWrapper.appendChild(Education);

// SOFT SKILLS

const { softSkills } = sourceData;

RightColumnWrapper.appendChild(generateListSection("Soft Skills", 'skills', softSkills));

// TEHNICAL SKILLS

const { technicalSkills, techStack } = sourceData;

const TechnicalSkills = generateListSection("Technical Skills", 'skills', technicalSkills);
const TechStack = generateList('tech_stack', techStack);
TechnicalSkills.appendChild(TechStack);


RightColumnWrapper.appendChild(TechnicalSkills);

// LANGUAGES

const { languages } = sourceData;

const Languages = generateSectioWithTitle("Languages");

languages.map(item => {
    const Language = generateElement('div', 'language');
    Language.innerHTML = `${item.language}: <span>${item.proficiency}</span>`;
    Languages.appendChild(Language);
});

RightColumnWrapper.appendChild(Languages);

// PERSONAL INTERESTS

const { interests } = sourceData;

RightColumnWrapper.appendChild(generateListSection("Interests", 'interests', interests));

// LEGAL

const { legalNotice } = sourceData;

const LegalNotice = generateElement('p', 'legal', legalNotice);

const cv_body = document.getElementById('cv_body');
cv_body.appendChild(Header);
cv_body.appendChild(MainLayoutWrapper);
cv_body.appendChild(LegalNotice);