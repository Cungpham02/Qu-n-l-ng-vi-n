function TableDanhSachPhatTrienDang({ data, setDanhSachPhatTrienDang }) {
  console.log(data);
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Stt</th>
          <th>Mã số sinh viên</th>
          <th>Họ và tên</th>
          <th>Ngày sinh</th>
          <th>Quê quán</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr>
            <td>
              <input type="checkbox" />
            </td>
            <td>{item.id}</td>
            <td>{item.mssv}</td>
            <td>{item.fullname}</td>
            <td>{item.ngaysinh}</td>
            <td>{item.quequan}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableDanhSachPhatTrienDang;
