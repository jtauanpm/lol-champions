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
    return (
        <div>
            <h1>
                {champ.id}
            </h1>
            <Link href="/">
                <button>
                    Back
                </button>
            </Link>
        </div>

    )
}