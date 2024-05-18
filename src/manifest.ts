import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  action: {
    default_popup: 'src/popup/popup.html'
  },
  content_scripts: [
    {
      "matches": ["<all_urls>"],
    }
  ],
  permissions: [
  "activeTab",
  "notifications",
  "scripting",
  "storage",
  "tabs"],
})