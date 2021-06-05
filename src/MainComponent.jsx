import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import axios from 'axios';



const MainComponent = () => {
    let [fullUrl, setFullUrl] = useState("");
    let [shortUrl, setShortUrl] = useState("");
    let [waitMsg, setWaitMsg] = useState(false);
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Accept": "application/json"
        }
    };

    const handleUrlInput = (event) => {
        setFullUrl(event.target.value);
    }

    const onGenerateShortUrl = (event) => {
        setWaitMsg(true);
        // const formData = new FormData();
        // formData.append('fullUrl', fullUrl);
        var obj = { 'fullUrl': fullUrl };

        axios.post(`${process.env.REACT_APP_BACKEND_HOST}/save`, obj, axiosConfig)
            .then(response => {
                setShortUrl(response.data.shortUrl);
                setWaitMsg(false);
            })
            .catch(err => {
                console.log(err);
                setWaitMsg(false);
            });
    }

    const handleUrlClick = () => {
        axios.get(shortUrl, axiosConfig)
            .then(response => {
                var fullUrl = response.data.fullurl;
                window.open(fullUrl);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h1 style={styles.mainHeaderStyle}>URL Shortener</h1>
            <h4 style={styles.headerStyle}>Generate your short URL here</h4>
            <form>
                <div style={styles.textDiv}>
                    <TextField
                        style={styles.textBoxStyle}
                        width="300"
                        label="URL"
                        onChange={handleUrlInput}
                        value={fullUrl}
                        fullWidth
                        required
                        variant="outlined"
                    />
                </div>
                <Button onClick={onGenerateShortUrl} style={styles.buttonStyle} variant="contained" color="primary">
                    Generate
                </Button>
            </form>
            {
                waitMsg && <h4 style={styles.waitTextStyle}>Please Wait...
                </h4>
            }
            {
                shortUrl && <h4 style={styles.urlText}>Short URL :
                    <Link style={styles.linkStyle} onClick={handleUrlClick}>
                        {shortUrl}
                    </Link><br></br>
                    <h5>(Click on the above URL to open full url)</h5>
                </h4>
            }
        </div>
    )
}

const styles = {
    textDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerStyle: {
        marginTop: 80,
        color: 'teal'
    },
    mainHeaderStyle: {
        color: 'purple'
    },
    textBoxStyle: {
        width: 300
    },
    buttonStyle: {
        margin: 30
    },
    urlText: {
        marginLeft: 10
    },
    linkStyle: {
        cursor: 'pointer'
    },
    waitTextStyle: {
        color: 'red'
    }
}

export default MainComponent;