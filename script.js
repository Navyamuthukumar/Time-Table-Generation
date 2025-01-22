let departments = [];
let semesters = [];
let subjects = {}; // Use an object for easier management
let faculties = [];
let venues=[];

// Function to show the selected section
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(`${sectionId}-section`);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    } else {
        console.error(`Section with ID "${sectionId}-section" not found.`);
    }
}

// Department Management
function addDepartment() {
    const deptName = document.getElementById('department-name').value;
    if (deptName) {
        departments.push(deptName);
        updateDepartmentTable();
        updateSelectOptions();
        document.getElementById('department-name').value = ''; // Clear input after adding
    }
}

function editDepartment(index) {
    const newDeptName = prompt("Edit Department Name:", departments[index]);
    if (newDeptName) {
        departments[index] = newDeptName;
        updateDepartmentTable();
        updateSelectOptions();
    }
}

function deleteDepartment(index) {
    if (confirm("Are you sure you want to delete this department?")) {
        departments.splice(index, 1);
        updateDepartmentTable();
        updateSelectOptions();
    }
}

function updateDepartmentTable() {
    const tbody = document.getElementById('department-table').querySelector('tbody');
    tbody.innerHTML = '';
    departments.forEach((department, index) => {
        const row = `
            <tr>
                <td>${department}</td>
                <td>
                    <button onclick="editDepartment(${index})">Edit</button>
                    <button onclick="deleteDepartment(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// Semester Management
function addSemester() {
    const deptSelect = document.getElementById('department-select').value;
    const semesterNumber = document.getElementById('semester-number').value;
    if (deptSelect && semesterNumber) {
        semesters.push({ department: deptSelect, semester: semesterNumber });
        updateSemesterTable();
        updateSelectOptions();
        document.getElementById('semester-number').value = ''; // Clear input after adding
    }
}

function editSemester(index) {
    const newDeptSelect = prompt("Edit Department:", semesters[index].department);
    const newSemesterNumber = prompt("Edit Semester Number:", semesters[index].semester);
    if (newDeptSelect && newSemesterNumber) {
        semesters[index] = { department: newDeptSelect, semester: newSemesterNumber };
        updateSemesterTable();
        updateSelectOptions();
    }
}

function deleteSemester(index) {
    if (confirm("Are you sure you want to delete this semester?")) {
        semesters.splice(index, 1);
        updateSemesterTable();
        updateSelectOptions();
    }
}

function updateSemesterTable() {
    const tbody = document.getElementById('semester-table').querySelector('tbody');
    tbody.innerHTML = '';
    semesters.forEach((semester, index) => {
        const row = `
            <tr>
                <td>${semester.department}</td>
                <td>${semester.semester}</td>
                <td>
                    <button onclick="editSemester(${index})">Edit</button>
                    <button onclick="deleteSemester(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}

// Subject Management
function addSubject() {
    const department = document.getElementById('subject-department-select').value;
    const semester = document.getElementById('subject-semester-select').value;
    const subjectName = document.getElementById('subject-name').value;

    if (department && semester && subjectName) {
        // Initialize department and semester in subjects if not already present
        if (!subjects[department]) {
            subjects[department] = {};
        }
        if (!subjects[department][semester]) {
            subjects[department][semester] = [];
        }

        // Add the new subject if it's not already in the list
        if (!subjects[department][semester].includes(subjectName)) {
            subjects[department][semester].push(subjectName);
        } else {
            alert("Subject already exists.");
        }

        // Update subject table and clear input
        updateSubjectTable();
        document.getElementById('subject-name').value = '';  // Clear input

        // Update faculty subject select dropdown
        updateSubjectSelect();
    } else {
        alert('Please fill in all fields before adding the subject.');
    }
}

// Update the subject table
function updateSubjectTable() {
    const tbody = document.getElementById('subject-table').querySelector('tbody');
    tbody.innerHTML = '';

    for (let department in subjects) {
        for (let semester in subjects[department]) {
            subjects[department][semester].forEach(subject => {
                const row = `
                    <tr>
                        <td>${department}</td>
                        <td>${semester}</td>
                        <td>${subject}</td>
                        <td>
                            <button onclick="editSubject('${department}', '${semester}', '${subject}')">Edit</button>
                            <button onclick="deleteSubject('${department}', '${semester}', '${subject}')">Delete</button>
                        </td>
                    </tr>`;
                tbody.innerHTML += row;
            });
        }
    }
}

function editSubject(department, semester, subjectName) {
    const newSubjectName = prompt("Edit Subject Name:", subjectName);
    if (newSubjectName) {
        const index = subjects[department][semester].indexOf(subjectName);
        if (index > -1) {
            subjects[department][semester][index] = newSubjectName;
            updateSubjectTable();
            updateSubjectSelect();
        }
    }
}

function deleteSubject(department, semester, subjectName) {
    if (confirm("Are you sure you want to delete this subject?")) {
        const index = subjects[department][semester].indexOf(subjectName);
        if (index > -1) {
            subjects[department][semester].splice(index, 1);
            if (subjects[department][semester].length === 0) {
                delete subjects[department][semester];
                if (Object.keys(subjects[department]).length === 0) {
                    delete subjects[department];
                }
            }
            updateSubjectTable();
            updateSubjectSelect();
        }
    }
}

function updateSubjectSelect() {
    const deptSelect = document.getElementById('faculty-department-select').value;
    const semSelect = document.getElementById('faculty-semester-select').value;
    const subSelect = document.getElementById('faculty-subject-select');
    
    if (deptSelect && semSelect) {
        const subjectList = subjects[deptSelect] ? subjects[deptSelect][semSelect] : [];
        subSelect.innerHTML = subjectList.map(subject => `<option value="${subject}">${subject}</option>`).join('');
    }
}

function addFaculty() {
    const deptSelect = document.getElementById('faculty-department-select').value;
    const semSelect = document.getElementById('faculty-semester-select').value;
    const subSelect = document.getElementById('faculty-subject-select').value;
    const facultyName = document.getElementById('faculty-name').value;

    if (deptSelect && semSelect && subSelect && facultyName) {
        // Add the new faculty entry
        faculties.push({ department: deptSelect, semester: semSelect, subject: subSelect, name: facultyName });

        // Update faculty table and clear input
        updateFacultyTable();
        document.getElementById('faculty-name').value = ''; // Clear input after adding
    } else {
        alert('Please fill in all fields before adding the faculty.');
    }
}

function editFaculty(index) {
    const newDeptSelect = prompt("Edit Department:", faculties[index].department);
    const newSemesterSelect = prompt("Edit Semester:", faculties[index].semester);
    const newSubjectSelect = prompt("Edit Subject:", faculties[index].subject);
    const newFacultyName = prompt("Edit Faculty Name:", faculties[index].name);
    if (newDeptSelect && newSemesterSelect && newSubjectSelect && newFacultyName) {
        faculties[index] = { department: newDeptSelect, semester: newSemesterSelect, subject: newSubjectSelect, name: newFacultyName };
        updateFacultyTable();
    }
}

function deleteFaculty(index) {
    if (confirm("Are you sure you want to delete this faculty?")) {
        faculties.splice(index, 1);
        updateFacultyTable();
    }
}

function updateFacultyTable() {
    const tbody = document.getElementById('faculty-table').querySelector('tbody');
    tbody.innerHTML = '';
    faculties.forEach((faculty, index) => {
        const row = `
            <tr>
                <td>${faculty.department}</td>
                <td>${faculty.semester}</td>
                <td>${faculty.subject}</td>
                <td>${faculty.name}</td>
                <td>
                    <button onclick="editFaculty(${index})">Edit</button>
                    <button onclick="deleteFaculty(${index})">Delete</button>
                </td>
            </tr>`;
        tbody.innerHTML += row;
    });
}


// Timetable Generation
function generateTimetable() {
    const department = document.getElementById('timetable-department-select').value;
    const semester = document.getElementById('timetable-semester-select').value;
    
    if (department && semester) {
        const subjectList = subjects[department] ? subjects[department][semester] : [];
        const timetableData = generateTimetableData(subjectList, department, semester);
        
        // Save timetable data as an HTML string to localStorage
        const timetableHTML = generateTimetableHTML(timetableData);
        localStorage.setItem('timetable', timetableHTML);
        
        // Redirect to the timetable display page
        window.location.href = 'timetable_display.html';
    } else {
        alert('Please select both department and semester.');
    }
}
// Venue Management with Department
function addVenue() {
    const venueName = document.getElementById('venue-name').value;
    const venueCapacity = document.getElementById('venue-capacity').value;
    const deptSelect = document.getElementById('venue-department-select').value;

    if (venueName && venueCapacity && deptSelect) {
        venues.push({ name: venueName, capacity: venueCapacity, department: deptSelect });
        updateVenueTable();
        document.getElementById('venue-name').value = ''; // Clear the input
        document.getElementById('venue-capacity').value = ''; // Clear the input
        document.getElementById('venue-department-select').value = ''; // Clear department input
    } else {
        alert('Please fill in all fields before adding the venue.');
    }
}

// Update Venue Table to Show Department
function updateVenueTable() {
    const tbody = document.querySelector('#venue-table tbody');
    tbody.innerHTML = '';
    venues.forEach((venue, index) => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = venue.name;
        row.insertCell(1).innerText = venue.capacity;
        row.insertCell(2).innerText = venue.department;
        const actionsCell = row.insertCell(3);
        actionsCell.innerHTML = `<button onclick="removeVenue(${index})">Remove</button>`;
    });
}

// Timetable Generation with Venue Information
function generateTimetableData(subjects, department, semester) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const periods = [
        { time: '09:00 - 10:00', name: 'Period 1' },
        { time: '10:00 - 11:00', name: 'Period 2' },
        { time: '11:00 - 11:15', name: 'Break' },
        { time: '11:15 - 12:15', name: 'Period 3' },
        { time: '12:15 - 01:00', name: 'Lunch Break' },
        { time: '01:00 - 02:00', name: 'Period 4' },
        { time: '02:00 - 03:00', name: 'Period 5' },
        { time: '03:00 - 04:00', name: 'Period 6' },
    ];

    const timetable = {};
    const departmentVenues = venues.filter(venue => venue.department === department); // Filter venues by department

    days.forEach(day => {
        timetable[day] = periods.map(period => {
            if (period.name.includes('Break')) {
                return { subject: period.name };
            } else {
                const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
                const faculty = faculties.find(fac => fac.department === department && fac.semester === semester && fac.subject === randomSubject);
                const venue = departmentVenues[Math.floor(Math.random() * departmentVenues.length)]; // Randomly assign a venue from the department
                return { subject: randomSubject, faculty: faculty ? faculty.name : 'TBA', venue: venue ? venue.name : 'N/A' };
            }
        });
    });

    return timetable;
}

// Timetable HTML Generation to Display Venue Information
function generateTimetableHTML(timetableData) {
    let timetableHTML = `
        <table class="timetable-table">
            <thead>
                <tr>
                    <th>Day</th>
                    <th>09:00 - 10:00</th>
                    <th>10:00 - 11:00</th>
                    <th>11:00 - 11:15</th>
                    <th>11:15 - 12:15</th>
                    <th>12:15 - 01:00</th>
                    <th>01:00 - 02:00</th>
                    <th>02:00 - 03:00</th>
                    <th>03:00 - 04:00</th>
                </tr>
            </thead>
            <tbody>`;

    for (const day in timetableData) {
        timetableHTML += `<tr><td>${day}</td>`;
        timetableData[day].forEach(period => {
            if (period.subject.includes('Break')) {
                timetableHTML += `<td class="break">${period.subject}</td>`;
            } else {
                timetableHTML += `<td>${period.subject}<br><small>${period.faculty}</small><br><small>${period.venue}</small></td>`;
            }
        });
        timetableHTML += '</tr>';
    }

    timetableHTML += '</tbody></table>';
    return timetableHTML;
}

// Update department options in venue department dropdown
function updateSelectOptions() {
    const deptSelects = document.querySelectorAll('#department-select, #subject-department-select, #faculty-department-select, #timetable-department-select, #venue-department-select');
    deptSelects.forEach(select => {
        select.innerHTML = departments.map(department => `<option value="${department}">${department}</option>`).join('');
    });

    const semSelects = document.querySelectorAll('#subject-semester-select, #faculty-semester-select, #timetable-semester-select');
    semSelects.forEach(select => {
        select.innerHTML = semesters.map(semester => `<option value="${semester.semester}">${semester.semester}</option>`).join('');
    });
}

// Initialize the UI
updateDepartmentTable();
updateSemesterTable();
updateSubjectTable();
updateFacultyTable();
updateSelectOptions();
updateVenueTable();
