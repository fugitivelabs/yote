/**
 * Living style-guide for this Yote application
 *
 * TODO:  This needs a lot of work
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';

// import module components
import AdminLayout from '../components/AdminLayout.js.jsx';

class StyleGuide extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return  (
      <AdminLayout>
        <section className="section">
          <div className="style-guide">
            <h3> Style Guide </h3>
            <div className="content">
              <div className="main-copy with-eyebrow">
                <div className="eyebrow title">
                  Typography
                </div>
                <div className="eyebrow content">
                  <h1>Heading 1</h1>
                  <h2>Heading 2</h2>

                  <h3>Heading 3</h3>

                  <h4>Heading 4</h4>

                  <h5>Heading 5</h5>

                  <h6>Subhead</h6>

                  <h6><em>Subhead Italics</em></h6>

                  <p className="large">Body Large</p>

                  <p>Body Primary</p>
                  <p>
                    <small>Body Small Caption</small>
                  </p>
                  <p>
                    <small><em>Body Small Caption Italics</em></small>
                  </p>
                  <p>
                    <strong>Strong Body</strong>
                  </p>
                  <p>Content with a <a href="#">Link</a> inside</p>
                  <ul className="top-nav primary">
                    <li>Primary Navigation</li>
                  </ul>
                  <ul className="top-nav">
                    <li>Secondary Navigation</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="content">

              <div className="main-copy with-eyebrow colors-samples ">
                <div className="eyebrow title">Colors</div>
                <div className="eyebrow content">

                  <div className="yt-row">
                    <div className="yt-col">
                      <p className="subhead">Colors</p>
                    </div>
                    <div className="yt-col">
                      <p className="subhead">Hex</p>
                    </div>
                    <div className="yt-col _50">
                      <p className="subhead">Uses</p>
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col primary">
                      <strong>
                        desert sunset
                      </strong>
                    </div>
                    <div className="yt-col primary">

                    </div>
                    <div className="yt-col _50">

                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col light-gray-1">
                      <strong>
                        Light Gray 1
                      </strong>
                    </div>
                    <div className="yt-col light-gray-1">
                      #f7f7f7
                    </div>
                    <div className="yt-col _50">
                      Background, Input
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col light-gray-2">
                      <strong>
                        Light Gray 2
                      </strong>
                    </div>
                    <div className="yt-col light-gray-2">
                      #E5E5E5
                    </div>
                    <div className="yt-col _50">
                      Lines, Workspace background
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col gray-1">
                      <strong>
                        Gray 1
                      </strong>
                    </div>
                    <div className="yt-col gray-1">
                      #A1AAB2
                    </div>
                    <div className="yt-col _50">
                      Light Text
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col gray-2">
                      <strong>
                        Gray 2
                      </strong>
                    </div>
                    <div className="yt-col gray-2">
                      #322B48
                    </div>
                    <div className="yt-col _50">
                      Primary Text, Dark Lines
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col black">
                      <strong>
                        Black
                      </strong>
                    </div>
                    <div className="yt-col black">
                      #1E2126
                    </div>
                    <div className="yt-col _50">
                      Background, Footer
                    </div>
                  </div>
                  <div className="yt-row center-vert">
                    <div className="yt-col green">
                      <strong>
                        Green
                      </strong>
                    </div>
                    <div className="yt-col success">
                      #37CCA5
                    </div>
                    <div className="yt-col _50">
                      Buttons
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="yt-container style-guide">
            <div className="content">
              <div className="section-header"><h3>Flex Grid</h3></div>

              <div className="main-copy with-eyebrow  ">
                <div className="eyebrow title">yt-container</div>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container"></div>
                </div>
              </div>
              <div className="main-copy with-eyebrow ">
                <div className="eyebrow title">yt-container slim</div>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container slim"></div>
                </div>
              </div>
              <div className="main-copy with-eyebrow  ">
                <div className="eyebrow title">yt-row</div>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container">
                    <div className="yt-row grid-demo">
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-copy with-eyebrow  ">
                <div className="eyebrow title">yt-row with-gutters</div>
                <br/>
                <br/>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container">
                    <div className="yt-row with-gutters grid-demo">
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                      <div className="yt-col grid-demo"><div className="card"> yt-col</div> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-copy with-eyebrow  ">
                <div className="eyebrow title">yt-row with-gutters & fixed columns</div>
                <br/>
                <br/>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container">
                    <div className="yt-row with-gutters grid-demo">
                      <div className="yt-col _50 grid-demo"><div className="card"> yt-col _50</div> </div>
                      <div className="yt-col _20 grid-demo"><div className="card"> yt-col _20</div> </div>
                      <div className="yt-col _30 grid-demo"><div className="card"> yt-col _30</div> </div>
                      <div className="yt-col _40 grid-demo"><div className="card"> yt-col _40</div> </div>
                      <div className="yt-col _60 grid-demo"><div className="card"> yt-col _60</div> </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-copy with-eyebrow  ">
                <div className="eyebrow title">yt-row with-gutters & responsive columns</div>
                <br/>
                <br/>
                <div className="eyebrow content  flex-grid-demo">
                  <div className="yt-container">
                    <div className="yt-row with-gutters grid-demo">
                      <div className="yt-col full s_30 m_50 grid-demo"><div className="card"> yt-col full s_30 m_50 </div> </div>
                      <div className="yt-col full s70 m_50 grid-demo"><div className="card"> yt-col full s70 m_50 </div> </div>

                      <div className="yt-col full xs_40 l_75 grid-demo"><div className="card"> yt-col  full xs_40 l_75</div> </div>
                      <div className="yt-col full xs_60 l_25  grid-demo"><div className="card"> yt-col full xs_60 l_25  </div> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AdminLayout>
    )
  }
}

export default StyleGuide;
