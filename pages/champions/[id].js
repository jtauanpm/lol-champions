import Link from "next/link";

export async function getStaticProps(context){
    const {params} = context
    const id = params.id

    const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion/${id}.json`)
    
    const data = await res.json()
    const champ = data.data[id]

    return {
        props: { 
            champ
        },
    }
}

export async function getStaticPaths(context){
    const response = await fetch("http://ddragon.leagueoflegends.com/cdn/12.23.1/data/en_US/champion.json")

    const dataJson = await response.json()
    const data = dataJson.data
    const champions = Object.keys(data).map(champ => data[champ])

    const paths = champions.map((champ) => {
        return {
            params: {
                id: `${champ.id}`
            }
        }
    })

    return { paths, fallback: false}
}


export default function Champion({champ}){
    console.log(champ)

    const champImageSrc = `http://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ.image.full}`

    console.log(champImageSrc)

    return (
        <div className="info">
            <ul>
                <h2>{champ.id}</h2>
                <img src={champImageSrc} alt="champion image"/>
                <li><b>Styles:</b>{champ.tags.map((tag) => (<p key={champ.tag}>{tag}</p>))}</li>
                <li><b>Description:</b><p>{champ.lore}</p></li>
            </ul>
            <Link href="/"><button>Back</button></Link>
        </div>

    )
}