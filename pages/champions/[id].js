import Link from "next/link";
import Image from "next/image";
import Head from 'next/head'

export async function getStaticProps(context) {
  const { params } = context;
  const id = params.id;

  const res = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${id}.json`
  );

  const data = await res.json();
  const champ = data.data[id];

  return {
    props: {
      champ,
    },
  };
}

export async function getStaticPaths(context) {
  const response = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json"
  );

  const dataJson = await response.json();
  const data = dataJson.data;
  const champions = Object.keys(data).map((champ) => data[champ]);

  const paths = champions.map((champ) => {
    return {
      params: {
        id: `${champ.id}`,
      },
    };
  });

  return { paths, fallback: false };
}

const imgLoader = ({src}) => {
  return `https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${src}`
};

export default function Champion({ champ }) {
  const srcImg = champ.image.full
  const tags = champ.tags

  return (
    <div className="info">
    <Head>
        <title>{champ.name}</title>
    </Head>
      <ul>
        <h2>{champ.id}</h2>
        <Image
          src={srcImg}
          alt="champion image"
          width={230}
          height={230}
          loader={imgLoader}
        />
        <li>
          <b>Styles:</b>
          {tags.map((tag, index) => (
            <p key={index}>{tag}</p>
          ))}
        </li>
        <li>
          <b>Description:</b>
          <p>{champ.lore}</p>
        </li>
      </ul>
      <Link href="/">
        <button className="btn btn-danger"
          type="button" >Back</button>
      </Link>
    </div>
  );
}
