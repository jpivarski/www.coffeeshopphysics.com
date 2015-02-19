from cassius import *
from math import *
import numpy

data = inspect("cleaned.dat")

fromdata = data.scatter("energy*1000, 0.001*proportional/(16000. - energy*1000.)", "energy*1000. < 1200.", connector="unsorted", marker=None, limit=None)
fromdata.values[0] = 211., 0.

def bw(x, mass, gamma, gammaee):
    return gammaee * (1./pi) * (gamma/2.) / ( (x - mass)**2 + (gamma/2.)**2 )

def gauss(x, mass, sigma, gammaee):
    return gammaee * exp(-(x - mass)**2 / 2. / sigma**2) / sqrt(2.*pi) / sigma

# peaks = Curve("""(bw(x, 775.5, 149.1, 7.04) +
#                   bw(x, 782., 8.49, 0.6) +
#                   bw(x, 1019.455, 4.26, 1.27) +
#                   bw(x, 1465., 400., 2.) +
#                   bw(x, 3096., 0.0929, 5.55) + 
#                   bw(x, 3686., 0.304, 2.35) + 
#                   bw(x, 9460., 0.054, 1.34) +
#                   bw(x, 10023., 0.032, 0.612) +
#                   bw(x, 10355., 0.020, 0.443)     )/(16000. - x)
#                   """, xmin=1200, namespace=locals(), linecolor="red")

peaks = Curve("""(bw(x, 1465., 400., 1.) +
                  gauss(x, 3096., 30., 5.55) + 
                  gauss(x, 3686., 30., 2.35) + 
                  gauss(x, 9460., 30., 1.34) +
                  gauss(x, 10023., 30., 0.612) +
                  gauss(x, 10355., 30., 0.443))/(16000. - x)
                  """, xmin=1200, namespace=locals(), linecolor="red")

energies = numpy.arange(1200., 15000., 1.)
fromform = numpy.zeros((15000 - 1200, 2))
for i in xrange(len(fromform)):
    fromform[i] = energies[i], peaks(energies[i])

all = numpy.zeros((len(fromdata.values) + len(fromform), 2))
all[:len(fromdata.values)] = fromdata.values
all[len(fromdata.values):] = fromform

for i in xrange(len(all)):
    all[i,0] = log(all[i,0]/6.58e-22 / 261.626, 2)
    #                       hbar       middleC  octaves

plot = Scatter(all, sig=["x", "y"], marker=None, connector="unsorted")
yticks = dict(map(lambda x: (x, None), numpy.arange(0., 6e-6, 0.5e-6)))

view(Overlay(Grid(regular(0.5e-6)), plot), xmin=70., xmax=77., ymin=0., ymax=6e-6, yticks=yticks, ylabel="Amplitude", xlabel="Number of octaves above middle C", xlabeloffset=0.12, bottommargin=0.12, leftmargin=0.1, ylabeloffset=-0.05, width=1000, height=650, fileName="hadron_spectrum.svg")

##################################

import wave
from struct import pack

length = 30

def note(mass, gamma, gammaee):
    freq = 2**(log(mass/6.58e-22, 2) - 74) # bring it down 74 octaves
    amp = gammaee/8.

    output = numpy.arange(0., length, 1./44100.)
    output = numpy.sin(output * (2.*pi*freq)) * numpy.exp(-output/(0.2/gamma)) * amp
    return output

# view(Scatter(x=numpy.arange(0., 1000./44100., 1./44100.), y=notes[:1000], marker=None, connector="xsort"))

notes = note(15000., 150., 20.) + note(775.5, 149.1, 7.04) + note(782., 8.49, 0.6) + note(1019.455, 4.26, 1.27) + note(1465., 400., 2.) + note(3096., 0.0929, 5.55) + note(3686., 0.304, 2.35) + note(9460., 0.054, 1.34) + note(10023., 0.032, 0.612) + note(10355., 0.020, 0.443)

w = wave.open("one_collision.wav", "wb")
w.setparams((1, 4, 44100, 44100*length, "NONE", "not compressed"))
for seg in notes:
    here = int(round(seg / 1.5 * 32767))
    if here < -32768:
        w.writeframes(pack("h", -32768))
    elif here > 32767:
        w.writeframes(pack("h", 32767))
    else:
        w.writeframes(pack("h", here))
w.close()

import random

notes = note(775.5, 149.1, 7.04) + note(782., 8.49, 0.6) + note(1019.455, 4.26, 1.27) + note(1465., 400., 2.) + note(3096., 0.0929, 5.55) + note(3686., 0.304, 2.35) + note(9460., 0.054, 1.34) + note(10023., 0.032, 0.612) + note(10355., 0.020, 0.443)

onenote = numpy.zeros((length+10)*44100, float)
onenote[:len(notes)] = notes[:]

many = numpy.zeros((length+10)*44100, float)
for i in range(10000):
    start = int(round(random.gauss(10., 3.) * 44100.))
    many += numpy.roll(onenote, start)
many /= sqrt(10000.)

print min(many), max(many)

w = wave.open("many_many_collisions.wav", "wb")
w.setparams((1, 4, 44100, 44100*(length+10), "NONE", "not compressed"))
for seg in many:
    here = int(round(seg / 0.60 * 32767))
    if here < -32768:
        w.writeframes(pack("h", -32768))
    elif here > 32767:
        w.writeframes(pack("h", 32767))
    else:
        w.writeframes(pack("h", here))
w.close()
