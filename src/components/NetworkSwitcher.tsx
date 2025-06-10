import { FC } from "react";
import dynamic from "next/dynamic";
import { useNetworkConfiguration } from "@/contexts/NetworkConfigurationProvider";

const NetworkSwitcher: FC = () => {
  const { networkConfiguration, setNetworkConfiguration } =
    useNetworkConfiguration();

  return (
    <div className="flex items-center gap-2">
      {/* SVG Icon */}
      {/* <NetworkSwitcherSVG /> */}

      {/* Dropdown */}
      <select
        value={networkConfiguration}
        onChange={(e) => setNetworkConfiguration(e.target.value || "devnet")}
        className="w-full max-w-xs rounded-full border border-gray-300 bg-white py-2 pl-2 pr-8 text-gray-700 focus:border-blue-500
    focus:outline-none
    focus:ring-1
    focus:ring-blue-500
    appearance-none
    cursor-pointer
"
      >
        {" "}
        <div className="bg-black">
          <option value="mainnet-beta">Mainnet</option>
          <option value="devnet">Devnet</option>
          <option value="testnet">Testnet</option>
        </div>
      </select>
    </div>
  );
};

export default dynamic(() => Promise.resolve(NetworkSwitcher), { ssr: false });
