import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

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
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          <Link href="#">
            <a>
              <strong>Como Utilizar Hooks</strong>
              <p>Pensando em sincronização em vezx de ciclos de vida.</p>
              <div className={commonStyles.infoContainer}>
                <div>
                  <FiCalendar />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser />
                  <h5>Joseph Oliveira</h5>
                </div>
              </div>
            </a>
          </Link>
          <Link href="#">
            <a>
              <strong>Como Utilizar Hooks</strong>
              <p>Pensando em sincronização em vezx de ciclos de vida.</p>
              <div className={commonStyles.infoContainer}>
                <div>
                  <FiCalendar />
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser />
                  <h5>Joseph Oliveira</h5>
                </div>
              </div>
            </a>
          </Link>
          <Link href="#">
            <a>
              <strong>Como Utilizar Hooks</strong>
              <p>Pensando em sincronização em vezx de ciclos de vida.</p>
              <div className={commonStyles.infoContainer}>
                <div>
                  <FiCalendar size={20}/>
                  <time>15 Mar 2021</time>
                </div>
                <div>
                  <FiUser size={20}/>
                  <h5>Joseph Oliveira</h5>
                </div>
              </div>
            </a>
          </Link>
        </div>
        <button type="button">
          Carregar mais posts
        </button>
      </main>

    </>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const prismic = getPrismicClient();
//   const postsResponse = await prismic.query([
//     Prismic.Predicates.at('document.type', 'post')
//   ], {
//     fetch: ['post.title', 'post.content'],
//     pageSize: 5
//   });

//   console.log(JSON.stringify(postsResponse, null, 2));

//   const posts = postsResponse.results.map(post => {
//     return {
//       slug: post.uid,
//       title: RichText.asText(post.data.title),
//       updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//     })
//     }
//   })

//   return {
//     props: {
//         posts
//     }
// }
// };
