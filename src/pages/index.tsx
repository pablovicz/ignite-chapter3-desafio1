import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { useState } from 'react';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient, prismicToPostsList } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {

  const [posts, setPosts] = useState<Post[]>(postsPagination?.results);
  const [nextPage, setNextPage] = useState<String>(postsPagination?.next_page);


  async function handleLoadMorePosts() {

    if (nextPage) {
      var headers = new Headers();

      fetch(postsPagination.next_page, {
        method: 'GET',
        headers: headers,
        mode: 'cors'
      })
        .then(response => response.json())
        .then((response) => {
          const newPosts = prismicToPostsList(response);
          const newPostList = [...posts, ...newPosts];
          setPosts(newPostList);
          setNextPage(response.next_page);
        })
    }
  }


  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <Link href={`/posts/${post.uid}`} key={post.uid}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <div className={commonStyles.infoContainer}>
                  <div>
                    <FiCalendar />
                    <time>{post.first_publication_date}</time>
                  </div>
                  <div>
                    <FiUser />
                    <h5>{post.data.author}</h5>
                  </div>
                </div>
              </a>
            </Link>
          ))}

        </div>
        {nextPage !== null ? (
          <button type="button" onClick={handleLoadMorePosts}>
            Carregar mais posts
          </button>
        ) : (
          <div></div>
        )
        }
      </main>

    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient();

  const postsResponse = await prismic.query([
    Prismic.Predicates.at('document.type', 'post')
  ], {
    fetch: ['post.title', 'post.subtitle', 'post.author', 'post.banner', 'post.content'],
    pageSize: 5
  });

  //console.log(JSON.stringify(postsResponse, null, 2));

  const postsPagination = {
    next_page: postsResponse.next_page,
    results: prismicToPostsList(postsResponse)
  }

  return {
    props: {
      postsPagination
    }
  }
};
