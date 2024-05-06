import Button from "../../compoment/Button";
import "./DangVien.scss";
function DangVienPage() {
  return (
    <div className="content_container">
      <div>
        <a href="#">Thông tin chung</a>/<a href="#">Danh sách đoàn viên</a>
      </div>
      <div className="wapper">
        <h3>Danh sách đoàn viên</h3>
        <div className="button_group">
          <Button outline small>
            Tìm kiếm
          </Button>
          <Button primary small>
            Save
          </Button>
        </div>
        <div className="menu_table_listDV" id="style1">
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" />
                    </th>
                    <th className="fixed-header">ID</th>
                    <th className="fixed-header">Name</th>
                    <th>Age</th>
                    <th>Address</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="fixed-data">1</td>
                    <td className="fixed-data buttons_modal">John Doe</td>
                    <td>30</td>
                    <td>123 Main St</td>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="fixed-data">1</td>
                    <td className="fixed-data buttons_modal">John Doe</td>
                    <td>30</td>
                    <td>123 Main St</td>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="fixed-data">1</td>
                    <td className="fixed-data buttons_modal">John Doe</td>
                    <td>30</td>
                    <td>123 Main St</td>
                    <td>john@example.com</td>
                  </tr>
                  <tr>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="fixed-data">1</td>
                    <td className="fixed-data buttons_modal">John Doe</td>
                    <td>30</td>
                    <td>123 Main St</td>
                    <td>john@example.com</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="title_table">
          <span className="text_table">
            Hiển thị từ 1 đến 45 của 45 Đoàn viên
          </span>
        </div>
        <div className="panition">
          <span>Đầu</span>
          <span>Trước</span>
          <span>1</span>
          <span>Tiếp</span>
          <span>Cuối</span>
        </div>
      </div>
    </div>
  );
}

export default DangVienPage;
