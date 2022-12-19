import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from '../components/table'
import 'bootstrap/dist/css/bootstrap.min.css';

export async function getServerSideProps(context) {
  const res = await fetch("http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json")
  const resJson = await res.json()
  const data = resJson.data

  return {
      props: {
        data
      }
  };
}

export default function Home({data}) {
  const champions = Object.keys(data).map(champ => data[champ])

  return (
    <div className={styles.container}>
      <Head>
        <title>League Of Legends Champions</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"></link>
      </Head>
      <h1 className='title'>
        League of Legends Champions
      </h1>
      <p className='names'>Jonathan Tauan &
        Rusdrael Antony
      </p>
      <Table champions={champions}/>


    </div>
  )
}
