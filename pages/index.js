import Head from "next/head";
import styles from "../styles/Home.module.css";
import CoinGecko from "coingecko-api";

const coinGeckoClient = new CoinGecko();

export default function Home(props) {
  const { data } = props.result;
  console.log(data);

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  const formatDollar = (number, maxSignificantDigits) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "usd",
      maxSignificantDigits,
    }).format(number);

  return (
    <div className={styles.container}>
      <Head>
        <title>Show Me Crypto DashBoard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>DashBoard</h1>
      <table className="table">
        <thead>
          <th>Symbol</th>
          <th>24H Change</th>
          <th>Price</th>
          <th>Market Cap</th>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img
                  src={coin.image}
                  style={{ width: 25, height: 25, marignRight: 10 }}
                />
                {coin.symbol.toUpperCase()}
              </td>
              <td>
                <span
                  className={
                    coin.price_change_percentage_24h > 0
                      ? "text-success"
                      : "text-danger"
                  }
                >
                  {formatPercent(coin.market_cap_change_percentage_24h)}
                </span>
              </td>
              <td>{formatDollar(coin.current_price, 12)}</td>
              <td>{formatDollar(coin.market_cap, 20)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer>
        <p className="small">
          This was inspired by this{" "}
          <a href="https://www.youtube.com/watch?v=klFeYge2G0I">tutorial</a>
        </p>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const params = {
    order: CoinGecko.ORDER.MARKET_CAP_DESC,
  };
  const result = await coinGeckoClient.coins.markets({ params });
  return {
    props: {
      result,
    },
  };
}
