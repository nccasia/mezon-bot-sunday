import { NextApiRequest, NextApiResponse } from 'next';

const mapCoin = new Map([
  ['btc', 'bitcoin'],
  ['eth', 'ethereum'],
  ['usdt', 'tether'],
  ['sol', 'solana'],
  ['bnb', 'binancecoin'],
  ['doge', 'dogecoin'],
  ['usdc', 'usd-coin'],
  ['xrp', 'ripple'],
  ['steth', 'staked-ether'],
  ['ada', 'cardano'],
  ['shib', 'shiba-inu'],
  ['avax', 'avalanche-2'],
  ['trx', 'tron'],
  ['wsteth', 'wrapped-steth'],
  ['ton', 'the-open-network'],
  ['wbtc', 'wrapped-bitcoin'],
  ['weth', 'weth'],
  ['link', 'chainlink'],
  ['bch', 'bitcoin-cash'],
  ['sui', 'sui'],
  ['dot', 'polkadot'],
  ['leo', 'leo-token'],
  ['near', 'near'],
  ['apt', 'aptos'],
  ['weeth', 'wrapped-eeth'],
  ['pepe', 'pepe'],
  ['ltc', 'litecoin'],
  ['uni', 'uniswap'],
  ['cro', 'crypto-com-chain'],
  ['usds', 'usds'],
  ['icp', 'internet-computer'],
  ['tao', 'bittensor'],
  ['fet', 'fetch-ai'],
  ['kas', 'kaspa'],
  ['xlm', 'stellar'],
  ['etc', 'ethereum-classic'],
  ['pol', 'polygon-ecosystem-token'],
  ['dai', 'dai'],
  ['stx', 'blockstack'],
  ['wif', 'dogwifcoin'],
  ['wbt', 'whitebit'],
  ['usde', 'ethena-usde'],
  ['xmr', 'monero'],
  ['render', 'render-token'],
  ['aave', 'aave'],
  ['okb', 'okb'],
  ['fil', 'filecoin'],
  ['arb', 'arbitrum'],
  ['mnt', 'mantle'],
  ['inj', 'injective-protocol'],
  ['imx', 'immutable-x'],
  ['vet', 'vechain'],
  ['fdusd', 'first-digital-usd'],
  ['tia', 'celestia'],
  ['ftm', 'fantom'],
  ['op', 'optimism'],
  ['hbar', 'hedera-hashgraph'],
  ['atom', 'cosmos'],
  ['bonk', 'bonk'],
  ['rune', 'thorchain'],
  ['weth', 'binance-peg-weth'],
  ['sei', 'sei-network'],
  ['floki', 'floki'],
  ['bgb', 'bitget-token'],
  ['grt', 'the-graph'],
  ['reth', 'rocket-pool-eth'],
  ['wld', 'worldcoin-wld'],
  ['ena', 'ethena'],
  ['popcat', 'popcat'],
  ['jup', 'jupiter-exchange-solana'],
  ['meth', 'mantle-staked-ether'],
  ['pyth', 'pyth-network'],
  ['theta', 'theta-token'],
  ['ezeth', 'renzo-restaked-eth'],
  ['solvbtc', 'solv-btc'],
  ['mkr', 'maker'],
  ['ondo', 'ondo-finance'],
  ['kcs', 'kucoin-shares'],
  ['om', 'mantra-dao'],
  ['ray', 'raydium'],
  ['algo', 'algorand'],
  ['cbbtc', 'coinbase-wrapped-btc'],
  ['ar', 'arweave'],
  ['brett', 'based-brett'],
  ['gt', 'gatechain-token'],
  ['neiro', 'neiro-3'],
  ['bsv', 'bitcoin-cash-sv'],
  ['beam', 'beam-2'],
  ['msol', 'msol'],
  ['gala', 'gala'],
  ['btt', 'bittorrent'],
  ['ldo', 'lido-dao'],
  ['jasmy', 'jasmycoin'],
  ['hnt', 'helium'],
  ['eeth', 'ether-fi-staked-eth'],
  ['strk', 'starknet'],
  ['matic', 'matic-network'],
  ['ftn', 'fasttoken'],
  ['aero', 'aerodrome-finance'],
  ['core', 'coredaoorg'],
]);

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
  return response.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { quantity = '1', token = 'btc' } = req.body;
  const normalizedToken = token.toString().toLowerCase();
  const coinId = mapCoin.get(normalizedToken);

  if (!coinId && normalizedToken !== 'tx8') {
    return res.status(400).json({ error: 'Invalid token' });
  }

  try {
    const prices =
      normalizedToken !== 'tx8'
        ? await fetchJson(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=vnd,usd`
          )
        : {};

    const exchangeRates = await fetchJson(
      'https://openexchangerates.org/api/latest.json?app_id=37ab0ab386214f19b7f5a7a51827e2db&base=USD&symbols=VND'
    );

    const amount = parseFloat(quantity);
    if (isNaN(amount))
      return res.status(400).json({ error: 'Invalid quantity' });

    const vndRate = exchangeRates.rates.VND;
    const vndPrice =
      normalizedToken !== 'tx8'
        ? prices[coinId!]?.vnd * amount
        : 0.005 * vndRate * amount;

    const usdPrice =
      normalizedToken !== 'tx8'
        ? prices[coinId!]?.usd * amount
        : 0.005 * amount;

    const vndPriceString = Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(vndPrice);

    const usdPriceString = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    }).format(usdPrice);

    return res
      .status(200)
      .json(`VND: ${vndPriceString}\nUSD: ${usdPriceString}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
