import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {

};

function Footer(props) {
    return (
        <div className="footer" style={{ left: 0 }}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6"><a href="#">2022 &copy; Nguyễn Minh Hiếu - Trần Văn Thuận - Huỳnh Văn Thảo</a></div>
                    <div className="col-md-6"><div className="text-md-right footer-links d-none d-md-block"><a href="/version">Phiên bản 1.0</a></div></div>
                </div>
            </div>
        </div>
    );
}

export default Footer;