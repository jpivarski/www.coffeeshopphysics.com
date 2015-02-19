from cassius import *

colors = darkseries(14, alternating=False)

curves = [Curve("exp(-(x-2412)**2/2./54**2)", 2250, 2650, linecolor=colors[0]),
          Curve("exp(-(x-2417)**2/2./54**2)", 2250, 2650, linecolor=colors[1]),
          Curve("exp(-(x-2422)**2/2./54**2)", 2250, 2650, linecolor=colors[2]),
          Curve("exp(-(x-2427)**2/2./54**2)", 2250, 2650, linecolor=colors[3]),
          Curve("exp(-(x-2432)**2/2./54**2)", 2250, 2650, linecolor=colors[4]),
          Curve("exp(-(x-2437)**2/2./54**2)", 2250, 2650, linecolor=colors[5]),
          Curve("exp(-(x-2442)**2/2./54**2)", 2250, 2650, linecolor=colors[6]),
          Curve("exp(-(x-2447)**2/2./54**2)", 2250, 2650, linecolor=colors[7]),
          Curve("exp(-(x-2452)**2/2./54**2)", 2250, 2650, linecolor=colors[8]),
          Curve("exp(-(x-2457)**2/2./54**2)", 2250, 2650, linecolor=colors[9]),
          Curve("exp(-(x-2462)**2/2./54**2)", 2250, 2650, linecolor=colors[10]),
          Curve("exp(-(x-2467)**2/2./54**2)", 2250, 2650, linecolor=colors[11]),
          Curve("exp(-(x-2472)**2/2./54**2)", 2250, 2650, linecolor=colors[12]),
          Curve("exp(-(x-2484)**2/2./54**2)", 2250, 2650, linecolor=colors[13]),
          ]

curves = [Curve("(sin(pi*(x - 2412)/54.0)/(pi*(x - 2412)/54.0))**2", 2350, 2550, linecolor=colors[0]),
          Curve("(sin(pi*(x - 2417)/54.0)/(pi*(x - 2417)/54.0))**2", 2350, 2550, linecolor=colors[1]),
          Curve("(sin(pi*(x - 2422)/54.0)/(pi*(x - 2422)/54.0))**2", 2350, 2550, linecolor=colors[2]),
          Curve("(sin(pi*(x - 2427)/54.0)/(pi*(x - 2427)/54.0))**2", 2350, 2550, linecolor=colors[3]),
          Curve("(sin(pi*(x - 2432)/54.0)/(pi*(x - 2432)/54.0))**2", 2350, 2550, linecolor=colors[4]),
          Curve("(sin(pi*(x - 2437)/54.0)/(pi*(x - 2437)/54.0))**2", 2350, 2550, linecolor=colors[5]),
          Curve("(sin(pi*(x - 2442)/54.0)/(pi*(x - 2442)/54.0))**2", 2350, 2550, linecolor=colors[6]),
          Curve("(sin(pi*(x - 2447)/54.0)/(pi*(x - 2447)/54.0))**2", 2350, 2550, linecolor=colors[7]),
          Curve("(sin(pi*(x - 2452)/54.0)/(pi*(x - 2452)/54.0))**2", 2350, 2550, linecolor=colors[8]),
          Curve("(sin(pi*(x - 2457)/54.0)/(pi*(x - 2457)/54.0))**2", 2350, 2550, linecolor=colors[9]),
          Curve("(sin(pi*(x - 2462)/54.0)/(pi*(x - 2462)/54.0))**2", 2350, 2550, linecolor=colors[10]),
          Curve("(sin(pi*(x - 2467)/54.0)/(pi*(x - 2467)/54.0))**2", 2350, 2550, linecolor=colors[11]),
          Curve("(sin(pi*(x - 2472)/54.0)/(pi*(x - 2472)/54.0))**2", 2350, 2550, linecolor=colors[12]),
          ]

legend = Legend([[curves[0], "Channel 1"],
                 [curves[1], "Channel 2"],
                 [curves[2], "Channel 3"],
                 [curves[3], "Channel 4"],
                 [curves[4], "Channel 5"],
                 [curves[5], "Channel 6"],
                 [curves[6], "Channel 7"],
                 [curves[7], "Channel 8"],
                 [curves[8], "Channel 9"],
                 [curves[9], "Channel 10"],
                 [curves[10], "Channel 11"],
                 [curves[11], "Channel 12"],
                 [curves[12], "Channel 13"],
                 ], justify="cl", colwid=[0.2, 0.8], width=0.17)

# view(Overlay(*(curves + [legend]), xmin=2250, xmax=2650, xlabel="Distribution of radio frequency (MHz)", bottommargin=0.2, xlabeloffset=0.23, leftmargin=0.05, yticks=None, topticks=None), width=1500, height=400, fileName="frequencySpread.svg")

view(Overlay(*(curves + [legend]), xmin=2350, xmax=2550, xlabel="Distribution of radio frequency (MHz)", bottommargin=0.2, xlabeloffset=0.23, leftmargin=0.05, yticks=None, topticks=None), width=1500, height=400, fileName="frequencySpread.svg")
             
