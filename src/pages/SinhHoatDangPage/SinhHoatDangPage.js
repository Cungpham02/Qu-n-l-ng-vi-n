import "./SinhHoat.scss";
function SinhHoatDangPage() {
  return (
    <div className="content_container">
      <div class="tab_container">
        <input className="clear" id="tab1" type="radio" name="tabs" checked />
        <label className="labelCD" for="tab1">
          <i class="fa fa-code"></i>
          <span>Danh sách nơi sinh hoạt</span>
        </label>

        <input className="clear" id="tab2" type="radio" name="tabs" />
        <label className="labelCD" for="tab2">
          <i class="fa fa-pencil-square-o"></i>
          <span>Thêm nơi sinh hoạt</span>
        </label>
        <section id="content1" class="tab-content">
          <h1>Danh sách nơi sinh hoạt</h1>
        </section>

        <section id="content2" class="tab-content">
          <h1>Thêm nơi sinh hoạt</h1>
        </section>
      </div>
    </div>
  );
}

export default SinhHoatDangPage;
