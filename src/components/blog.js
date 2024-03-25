import React from 'react';
import { Link } from 'gatsby';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTab,
  changePage,
  changeFromAndTo,
} from '../redux/currentTabSlice';

export default function Blog({ data }) {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.currentTab.tab);
  const current_page = useSelector((state) => state.currentTab.page);
  let posts = [];
  let tab_data = data[activeTab][activeTab];
  const { from, to } = useSelector((state) => state.currentTab);
  //
  function getRange(number) {
    if (number < 1) {
      return { from: 0, to: 5 };
    }
    const from = (number - 1) * 5;
    const to = number * 5;
    return { from, to };
  }
  //
  function switch_tabs(e) {
    dispatch(changeTab(e.target.innerText.toLowerCase()));
    updatePage(1);
  }
  //
  if (activeTab) {
    posts = tab_data.slice(from, to);
  }

  function updatePage(page_index) {
    dispatch(changePage(page_index));
    dispatch(changeFromAndTo(getRange(page_index)));
  }

  function mapPaginationButtons() {
    const buttons = [];
    const itemsPerPage = 5;
    const pagesCount = Math.ceil(tab_data.length / itemsPerPage);
    for (let i = 1; i <= pagesCount; i++) {
      let borderClass;
      if (i !== pagesCount) {
        borderClass = `custom-border-right`;
      }
      if (current_page === i) {
        borderClass = `${borderClass} disabled`;
      }
      buttons.push(
        <div
          onClick={() => updatePage(i)}
          className={`p-1 px-2  ${borderClass} button`}
          aria-current="page"
          style={{
            borderTopLeftRadius: i === 1 ? '4px' : '',
            borderTopRightRadius: i === pagesCount ? '4px' : '',
            borderBottomLeftRadius: i === 1 ? '4px' : '',
            borderBottomRightRadius: i === pagesCount ? '4px' : '',
          }}
        >
          <span className="page-link">{i}</span>
        </div>
      );
    }

    return buttons;
  }
  return (
    <div className="p-3 mt-2 mb-2 rounded small w-100">
      <div className="d-flex pb-2">
        {/* 'Blog', */}
        {['Blog', 'Projects'].map((tab, index) => (
          <div
            onClick={(e) => switch_tabs(e)}
            key={index}
            className={`button custom-button border border-secondary rounded-1 ${
              activeTab === tab.toLowerCase() ? `active` : ''
            }`}
          >
            {tab}
          </div>
        ))}
      </div>
      <div>
        {posts.map((post, index) => (
          <article className="border-bottom border-secondary mb-2" key={index}>
            <Link class={`link`} to={post.fields.slug}>
              <h4>{post.frontmatter.title}</h4>
            </Link>
            <small>
              {post.frontmatter.author}, {post.frontmatter.date}
            </small>
            <p>{post.excerpt}</p>
          </article>
        ))}
      </div>
      <nav>
        <div
          class={`d-flex custom-border
           rounded-1 position-relative bottom-0`}
          style={{ width: 'min-content' }}
        >
          {mapPaginationButtons()}
        </div>
      </nav>
    </div>
  );
}
