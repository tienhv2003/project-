// Lấy dữ liệu từ LocalStorage hoặc khởi tạo mảng rỗng nếu chưa có
let classInformation = JSON.parse(localStorage.getItem('classInfo')) || [];

// Tạo bảng từ dữ liệu đã lưu
let tableBody = document.querySelector('#dataTable tbody');

// Hàm để render danh sách khóa học từ localStorage
function renderClassList(classes = classInformation) {
    tableBody.innerHTML = ''; // Xóa toàn bộ nội dung cũ trước khi render lại

    classes.forEach((item, index) => {
        let row = document.createElement('tr');

        let sttCell = document.createElement('td');
        sttCell.textContent = index + 1; // STT tự động tăng dựa trên vị trí trong mảng
        row.appendChild(sttCell);

        let maLopCell = document.createElement('td');
        maLopCell.textContent = item.maLop;
        row.appendChild(maLopCell);

        let tenLopCell = document.createElement('td');
        tenLopCell.textContent = item.tenLop;
        row.appendChild(tenLopCell);

        let giangVienCell = document.createElement('td');
        giangVienCell.textContent = item.giangVien;
        row.appendChild(giangVienCell);

        let moTaCell = document.createElement('td');
        moTaCell.textContent = item.moTa;
        row.appendChild(moTaCell);

        let siSoCell = document.createElement('td');
        siSoCell.textContent = item.siSo;
        row.appendChild(siSoCell);

        let trangThaiCell = document.createElement('td');
        trangThaiCell.textContent = item.trangThai;
        row.appendChild(trangThaiCell);

        let khoaHocCell = document.createElement('td');
        khoaHocCell.textContent = item.khoaHoc;
        row.appendChild(khoaHocCell);
        //Nút sửa
        let suaCell = document.createElement('td');
        let editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.onclick = function () {
            editClass(index); //Gọi hàm sửa với chỉ mục 
        };
        suaCell.appendChild(editButton);
        row.appendChild(suaCell);

        //Nút xóa
        let xoaCell = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa'
        deleteButton.onclick = function () {
            deleteClass(index); //Gọi hàm xóa với chỉ mục
        }
        xoaCell.appendChild(deleteButton);
        row.appendChild(xoaCell);

        // Thêm hàng vào tbody của bảng
        tableBody.appendChild(row);
    });
}

//Hàm để xóa khóa học
function deleteClass(index) {
    classInformation.splice(index, 1); // Xóa phần tử theo chỉ mục
    localStorage.setItem("classInfo", JSON.stringify(classInformation)); // Cập nhật lại localStorage
    renderClassList(); // Render lại bảng sau khi xóa
}

// Hàm để sửa khóa học
function editClass(index) {
    //Điền dữ liệu khóa học vào form
    let  = courseInformation[index];
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



//Gọi hàm render khi trang được tải lại
renderClassList();