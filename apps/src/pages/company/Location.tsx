import CompanyLayout from './CompanyLayout'

function CompanyLocation() {
  return (
    <CompanyLayout>
      <div className="contetns company4">

        <div className="responsive title_area">
          <h2 data-aos="fade-left">사업장안내</h2>
          <p data-aos="fade-up" data-aos-delay="200">설립 이후 끊임없는 연구개발과 특허 원천기술로, 반·출입 정보보안 시장을 리드하고 있습니다.<span className="br"></span>먼저 고민하고 끝까지 책임지는 기술, 데이타프로텍</p>
        </div>

        <div className="section1">
        </div>

        <div className="responsive section_con bg">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">데이타프로텍 본사 (기술개발연구소)</div></h3>
          <p>
            대구광역시 북구 칠곡중앙대로 427, 4층 / <span className="addr_br"></span>우편번호 41447<br /><br />
            <strong>Tel.</strong> 031-701-0712 / 070-7542-7788(직통)<br />
            <strong>Fax.</strong> 031-701-0714<br />
            <strong>Email.</strong> sales@dataprotec.co.kr
          </p>
        </div>

        <div className="responsive">
          <div className="line">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d12920.251070103943!2d128.53242758957182!3d35.94543445382011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z64yA6rWs6rSR7Jet7IucIOu2geq1rCDsuaDqs6HspJHslZnrjIDroZwgNDI3ICjqtIDsnYzrj5kpIC8g7Jqw7Y6467KI7Zi4IDQxNDQ3!5e0!3m2!1sko!2skr!4v1618643784553!5m2!1sko!2skr" width="100%" className="map_height" style={{ border: 0 }} allowFullScreen loading="lazy" title="본사 지도"></iframe>
          </div>
        </div>

        <div className="responsive section_con bg">
          <h3><span data-aos="fade-right"></span><div data-aos="fade-up" data-aos-delay="200">군포 지사(영업,마케팅)</div></h3>
          <p>
            경기도 군포시 고산로148번길 17 군포IT밸리 B동 1501호 / <span className="addr_br"></span>우편번호 15850<br /><br />
            <strong>Tel.</strong> 031-701-0712 / 070-5129-0551(직통)<br />
            <strong>Fax.</strong> 031-701-0714<br />
            <strong>Email.</strong> sales@dataprotec.co.kr
          </p>
        </div>

        <div className="responsive">
          <div className="line">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3171.6843054802234!2d126.95208131558402!3d37.34998199425745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z6rK96riw64-EIOq1sO2PrOyLnCDqs6DsgrDroZwxNDjrsojquLggMTcg6rWw7Y-sSVTrsLjrpqwgQuuPmSAxNTAx7Zi4!5e0!3m2!1sko!2skr!4v1618644480740!5m2!1sko!2skr" width="100%" className="map_height" style={{ border: 0 }} allowFullScreen loading="lazy" title="군포 지사 지도"></iframe>
          </div>
        </div>

      </div>
    </CompanyLayout>
  )
}

export default CompanyLocation
