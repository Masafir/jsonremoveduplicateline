import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React,{ useState } from 'react'

export default function Home() {
  const [inputJson,setInputJson] = useState("");
  const [outputJson,setOutputJson] = useState("");
  const [error,setError] = useState(false);

  const handleRemoveDuplicateLine = () => {
    const inputParsed = JSON.parse(inputJson) ? JSON.parse(inputJson) : false;
    if(inputParsed)
    {
      let inputKeys = Object.keys(inputParsed);
      let newOutput = {};
      inputKeys.forEach((element,index) => {
        let foundedIndex = inputKeys.findIndex((value,id) => element == value && id != index);
        if(foundedIndex > -1)
        {
          inputKeys.splice(foundedIndex, 1);
        }
        newOutput[element] = inputParsed[element];
      });
      setOutputJson(JSON.stringify(newOutput));
    }
    else {
      setError(true);
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Json Remove Duplicate Line</title>
        <meta name="description" content="Json remove my duplicate line" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&display=swap" rel="stylesheet"></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Remove your duplicate line
        </h1>

        <label for="input_text"> Input </label>
        <textarea value={inputJson} id="input_text" className={"jsonArea"} onChange={(e) => setInputJson(e.target.value)} />
        <span> {inputJson.length} characters </span>
        { error && <span> Text is not valid </span>}
        <button onClick={() => handleRemoveDuplicateLine()}> Remove it ! </button>

        <label for="output_text" > Output </label>
        <textarea value={outputJson} className={"jsonArea"} id="output_text" />
        <span> {outputJson.length} characters </span>
        <button onClick={() => navigator.clipboard.writeText(outputJson)}> Copy to clipboard ! </button>
       </main>
    </div>
  )
}
