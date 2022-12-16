import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from '../components/table'

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
      </Head>
      <h1>
        League of Legends Champions
      </h1>

      <Table champions={champions}/>
      

    </div>
  )
}
