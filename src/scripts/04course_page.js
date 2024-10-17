// Lấy dữ liệu từ LocalStorage hoặc khởi tạo mảng rỗng nếu chưa có
let courseInformation = JSON.parse(localStorage.getItem('courseInfo')) || [];

// Tạo bảng từ dữ liệu đã lưu
let tableBody = document.querySelector('#dataTable tbody');

// Hàm để render danh sách khóa học từ localStorage
function renderCourseList(courses = courseInformation) {
    tableBody.innerHTML = ''; // Xóa toàn bộ nội dung cũ trước khi render lại

    courses.forEach((item, index) => {
        let row = document.createElement('tr');

        let sttCell = document.createElement('td');
        sttCell.textContent = index + 1; // STT tự động tăng dựa trên vị trí trong mảng
        row.appendChild(sttCell);

        let maKhoaHocCell = document.createElement('td');
        maKhoaHocCell.textContent = item.maKhoaHoc;
        row.appendChild(maKhoaHocCell);

        let tenKhoaHocCell = document.createElement('td');
        tenKhoaHocCell.textContent = item.tenKhoaHoc;
        row.appendChild(tenKhoaHocCell);

        let thoiGianCell = document.createElement('td');
        thoiGianCell.textContent = item.thoiGian;
        row.appendChild(thoiGianCell);

        let trangThaiCell = document.createElement('td');
        trangThaiCell.textContent = item.trangThai;
        row.appendChild(trangThaiCell);

        //Nút sửa
        let suaCell = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.onclick = function () {
            editCourse(index); //Gọi hàm sửa với chỉ mục 
        };
        suaCell.appendChild(editButton);
        row.appendChild(suaCell);

        //Nút xóa
        let xoaCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa'
        deleteButton.onclick = function () {
            deleteCourse(index); //Gọi hàm xóa với chỉ mục
        }
        xoaCell.appendChild(deleteButton);
        row.appendChild(xoaCell);

        // Thêm hàng vào tbody của bảng
        tableBody.appendChild(row);
    });
}

//Hàm để xóa khóa học
function deleteCourse(index) {
    courseInformation.splice(index, 1); // Xóa phần tử theo chỉ mục
    localStorage.setItem("courseInfo", JSON.stringify(courseInformation)); // Cập nhật lại localStorage
    renderCourseList(); // Render lại bảng sau khi xóa
}

// Hàm để sửa khóa học
function editCourse(index) {
    //Điền dữ liệu khóa học vào form
    let course = courseInformation[index];
    courseCode.value = course.maKhoaHoc;
    courseName.value = course.tenKhoaHoc;
    courseTime.value = course.thoiGian;

   
    // Hiển thị trạng thái hiện tại trên form
    if (course.trangThai === "Hoạt Động") {
        document.getElementById("hoat-dong").checked = true;
    } else {
        document.getElementById("khong-hoat-dong").checked = true;
    }

    //Ẩn bảng, hiển thị form để chỉnh sửa
    dataTable.style.display = "none";
    formAddNew.style.display = "block";
    row2.style.display = "none";

    //Thay đổi hành động của nút Thêm mới thành "Lưu chỉnh sửa"
    btnAddNewForm.textContent = "Lưu chỉnh sửa";

    // Xóa tất cả sự kiện trước đó để tránh xung đột
    let newBtnAddNewForm = btnAddNewForm.cloneNode(true); // Tạo nút mới giống hệt nút hiện tại
    btnAddNewForm.replaceWith(newBtnAddNewForm); // Thay thế nút cũ bằng nút mới
    btnAddNewForm = newBtnAddNewForm; // Cập nhật lại nút btnAddNewForm để dùng tiếp

    // Lưu chỉnh sửa khóa học
    btnAddNewForm.addEventListener('click', function () {
        // Kiểm tra nếu các trường dữ liệu đều có giá trị
        if (!courseCode.value || !courseName.value || !courseTime.value) {
            alert("Vui lòng hoàn thành Form");
            return; // Dừng lại nếu có trường nào trống
        }

        // Kiểm tra thời gian phải là số và lớn hơn 0
        if (isNaN(courseTime.value) || Number(courseTime.value) <= 0) {
            alert("Thời gian phải là một số lớn hơn 0.");
            return;
        }

        // Lấy giá trị của radio button trạng thái được chọn
        let statusElement = document.querySelector('input[name="status"]:checked');
        if (!statusElement) {
            alert("Vui lòng chọn trạng thái khóa học");
            return; // Dừng lại nếu không có radio button nào được chọn
        }

        let status = statusElement.value;

        // Cập nhật thông tin khóa học đã chỉnh sửa
        courseInformation[index] = {
            stt: index + 1,
            maKhoaHoc: courseCode.value,
            tenKhoaHoc: courseName.value,
            thoiGian: courseTime.value,
            trangThai: status === "hoat-dong" ? "Hoạt Động" : "Không Hoạt Động",
        };

        //Cập nhật lại localStorage
        localStorage.setItem("courseInfo", JSON.stringify(courseInformation));

        //Reset form và nút sau khi lưu
        courseCode.value = '';
        courseName.value = '';
        courseTime.value = '';
        btnAddNewForm.textContent = 'Thêm mới';

        //Hiển thị lại bảng và ẩn form
        formAddNew.style.display = "none";
        dataTable.style.display = "";
        row2.style.display = "";

        renderCourseList(); // Render lại bảng với dữ liệu mới
    });
}



// Gọi hàm render khi trang được tải lại
renderCourseList();

// Function thêm mới khóa học
let formAddNew = document.getElementById("form_addNew");
let btnAddNew = document.getElementById("row_2_addNew");
let dataTable = document.getElementById("dataTable");
let row2 = document.getElementById("row_2");
let btnCloseForm = document.getElementById("btn_closeform");
let xBtnAddNewForm = document.getElementById("x-btn-addnewform");

// Ẩn hiện form  
btnAddNew.onclick = function () {
    dataTable.style.display = "none";
    row2.style.display = "none";
    formAddNew.style.display = "block"; // Form (ẩn)-> hiện ra
    
    courseCode.value = '';
    courseName.value = '';
    courseTime.value = '';
    document.getElementById("hoat-dong").checked = false;
    document.getElementById("khong-hoat-dong").checked = false;


}

btnCloseForm.onclick = function () {
    formAddNew.style.display = "none";
    dataTable.style.display = "";
    row2.style.display = "";
    document.getElementById("hoat-dong").checked = false;
    document.getElementById("khong-hoat-dong").checked = false;
    btnAddNewForm.textContent = 'Thêm mới';

}

xBtnAddNewForm.onclick = function () {
    formAddNew.style.display = "none";
    dataTable.style.display = "";
    row2.style.display = "";
    document.getElementById("hoat-dong").checked = false;
    document.getElementById("khong-hoat-dong").checked = false;
    btnAddNewForm.textContent = 'Thêm mới';

}
// Thêm data vào localStorage
let btnAddNewForm = document.getElementById("btn_addnewform");
let courseCode = document.getElementById("ma-khoa-hoc");
let courseName = document.getElementById("ten-khoa-hoc");
let courseTime = document.getElementById("thoi-gian");

btnAddNewForm.addEventListener('click', function () {
    // Kiểm tra nếu các trường dữ liệu đều có giá trị
    if (!courseCode.value || !courseName.value || !courseTime.value) {
        alert("Please fill in all fields.");
        return; // Dừng lại nếu có trường nào trống
    }

    // Kiểm tra mã khóa học và tên khóa học không được trùng
    let isDuplicate = courseInformation.some(function (course) {
        return course.maKhoaHoc === courseCode.value || course.tenKhoaHoc === courseName.value;
    });

    if (isDuplicate) {
        alert("Mã khóa học hoặc tên khóa học đã tồn tại.");
        return; // Dừng lại nếu mã khóa học hoặc tên khóa học trùng
    }

    // Kiểm tra thời gian phải là số và lớn hơn 0
    if (isNaN(courseTime.value) || Number(courseTime.value) <= 0) {
        alert("Thời gian phải là một số lớn hơn 0.");
        return; // Dừng lại nếu thời gian không hợp lệ
    }

    // Lấy giá trị của radio button trạng thái được chọn
    let statusElement = document.querySelector('input[name="status"]:checked');
    if (!statusElement) {
        alert("Vui lòng hoàn thành hết form");
        
        return; // Dừng lại nếu không có radio button nào được chọn
    }

    let status = statusElement.value;
    
    let newCourseInfo = {
        stt: courseInformation.length + 1, // STT tự động tăng
        maKhoaHoc: courseCode.value,
        tenKhoaHoc: courseName.value,
        thoiGian: courseTime.value,
        trangThai: status === "hoat-dong" ? "Hoạt Động" : "Không Hoạt Động",
    };

    // Thêm dữ liệu vào danh sách
    courseInformation.push(newCourseInfo);
    console.log("New course info added: ", newCourseInfo);

    // Lưu toàn bộ mảng vào localStorage
    localStorage.setItem("courseInfo", JSON.stringify(courseInformation));
    console.log("Current courseInformation in localStorage: ", courseInformation);

    // Gọi hàm render để hiển thị lại bảng
    renderCourseList();

    // Reset các giá trị đầu vào sau khi thêm
    courseCode.value = '';
    courseName.value = '';
    courseTime.value = '';
});

// Hàm tìm kiếm khóa học
function searchCourses() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredCourses = courseInformation.filter(course => 
        course.maKhoaHoc.toLowerCase().includes(searchInput) || 
        course.tenKhoaHoc.toLowerCase().includes(searchInput)
    );

    renderCourseList(filteredCourses);
}

// Gán sự kiện cho nút tìm kiếm
document.getElementById('row_2_btnSearch').onclick = searchCourses;



