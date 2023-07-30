// XML code string containing the SVG data
import { GeneralPath } from 'yfiles'

// Function to create a yFiles GeneralPath from SVG path data
export default function createGeneralPathFromSvgPathData(pathData: string) {
  const generalPath = new GeneralPath()

  // Split the SVG path data into individual commands
  const commands = pathData.match(/[MLCZ].*?(?=[MLCZ]|$)/g) || []
  let startx = 0
  let starty = 0
  for (const command of commands) {
    // Extract the command type (M, L, C, Z)
    const type = command.charAt(0)

    // Extract the numeric parameters for the command
    const params = command.substring(1).trim().split(/\s+/).map(Number)

    switch (type) {
      case 'M':
        startx = params[0]
        starty = params[1]
        generalPath.moveTo(0, 0)
        break
      case 'C':
        for (let i = 0; i < params.length; i = i + 2) {
          generalPath.lineTo((startx - params[i]), (starty - params[i + 1]))
        }
        break
      case 'Z':
        generalPath.close()
        break
    }
  }

  return generalPath
}
