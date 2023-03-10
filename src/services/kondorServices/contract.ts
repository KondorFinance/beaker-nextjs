export const contract = {
  name: 'Pond',
  methods: [
    {
      name: 'set_governor',
      args: [
        {
          type: 'account',
          name: 'new_governor'
        }
      ],
      returns: {
        type: 'void'
      },
      desc: 'sets the governor of the contract, may only be called by the current\ngovernor'
    },
    {
      name: 'bootstrap',
      args: [
        {
          type: 'pay',
          name: 'seed'
        },
        {
          type: 'asset',
          name: 'a_asset'
        },
        {
          type: 'asset',
          name: 'b_asset'
        }
      ],
      returns: {
        type: 'uint64'
      },
      desc: 'bootstraps the contract by opting into the assets and creating the\npond token. Note this method will fail if it is attempted more than  once on the same contract since the assets and pond token application  state values are marked as static and cannot be overridden. Args:     seed: Initial Payment transaction to the app account so it can opt      in to assets and create pond token.     a_asset: One of the two assets this pond should allow swapping      between.     b_asset: One of the two assets this pond should allow swapping      between. Returns:     The asset id of the pond token created.'
    },
    {
      name: 'mint',
      args: [
        {
          type: 'axfer',
          name: 'a_xfer'
        },
        {
          type: 'axfer',
          name: 'b_xfer'
        },
        {
          type: 'asset',
          name: 'pond_asset'
        },
        {
          type: 'asset',
          name: 'a_asset'
        },
        {
          type: 'asset',
          name: 'b_asset'
        }
      ],
      returns: {
        type: 'void'
      },
      desc: "mint pond tokens given some amount of a_asset and b_asset\non commit.\nGiven some amount of stable assets in the transfer, mint some number of  pond tokens calculated with the pond's current balance and  circulating supply of pond tokens.\nArgs:     a_xfer: Asset Transfer Transaction of a_asset as a deposit to the      pond in exchange for pond tokens.     b_xfer: Asset Transfer Transaction of b_asset as a deposit to the      pond in exchange for pond tokens.     pond_asset: The asset ID of the pond token so that we may      a_asset: The asset ID of the asset A token so that we may      distribute it.     b_asset: The asset ID of the asset B token so that we may      distribute it."
    },
    {
      name: 'burn',
      args: [
        {
          type: 'axfer',
          name: 'pool_xfer',
          desc: 'Asset Transfer Transaction of the pool token for the amount the sender wishes to redeem'
        },
        {
          type: 'asset',
          name: 'pool_asset',
          desc: 'Asset ID of the pool token so we may inspect balance.'
        },
        {
          type: 'asset',
          name: 'a_asset',
          desc: 'Asset ID of Asset A so we may inspect balance and distribute it'
        },
        {
          type: 'asset',
          name: 'b_asset',
          desc: 'Asset ID of Asset B so we may inspect balance and distribute it'
        }
      ],
      returns: {
        type: 'void'
      },
      desc: 'burn pool tokens to get back some amount of asset A and asset B'
    },
    {
      name: 'swap',
      args: [
        {
          type: 'axfer',
          name: 'swap_xfer',
          desc: 'Asset Transfer Transaction of either Asset A or Asset B'
        },
        {
          type: 'asset',
          name: 'a_asset',
          desc: 'Asset ID of asset A so we may inspect balance and possibly transfer it'
        },
        {
          type: 'asset',
          name: 'b_asset',
          desc: 'Asset ID of asset B so we may inspect balance and possibly transfer it'
        }
      ],
      returns: {
        type: 'void'
      },
      desc: 'Swap some amount of either asset A or asset B for the other'
    }
  ],
  networks: {}
}
