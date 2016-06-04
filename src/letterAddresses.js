    var letterAddresses = {
        "A": {
            "Description": "Absolute or incremental position of A axis (rotational axis around X axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "B": {
            "Description": "Absolute or incremental position of B axis (rotational axis around Y axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "C": {
            "Description": "Absolute or incremental position of C axis (rotational axis around Z axis)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "D": {
            "Description": "Defines diameter or radial offset used for cutter compensation. D is used for depth of cut on lathes. It is used for aperture selection and commands on photoplotters.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "E": {
            "Description": "Precision feedrate for threading on lathes",
            "Corollary info": "",
            "action": function() {

            }
        },
        "F": {
            "Description": "Defines feed rate",
            "Corollary info": "Common units are distance per time for mills (inches per minute, IPM, or millimeters per minute, mm/min) and distance per revolution for lathes (inches per revolution, IPR, or millimeters per revolution, mm/rev)",
            "action": function() {

            }
        },
        "*G*": {
            "Description": "Address for preparatory commands",
            "Corollary info": "G commands often tell the control what kind of motion is wanted (e.g., rapid positioning, linear feed, circular feed, fixed cycle) or what offset value to use.",
            "action": function() {

            }
        },
        "H": {
            "Description": "Defines tool length offset; Incremental axis corresponding to C axis (e.g., on a turn-mill)",
            "Corollary info": "",
            "action": function() {

            }
        },
        "I": {
            "Description": "Defines arc center in X axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "J": {
            "Description": "Defines arc center in Y axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "K": {
            "Description": "Defines arc center in Z axis for G02 or G03 arc commands. Also used as a parameter within some fixed cycles, equal to L address.",
            "Corollary info": "",
            "action": function() {

            }
        },
        "L": {
            "Description": "Fixed cycle loop count; Specification of what register to edit using G10",
            "Corollary info": "*Fixed cycle loop count:* Defines number of repetitions (\"loops\") of a fixed cycle at *each* position. Assumed to be 1 unless programmed with another integer. Sometimes the K address is used instead of L. With incremental positioning (G91), a series of equally spaced holes can be programmed as a loop rather than as individual positions. *G10 use:* Specification of what register to edit (work offsets, tool radius offsets, tool length offsets, etc.).",
            "action": function() {

            }
        },
        "*M*": {
            "Description": "Miscellaneous function",
            "Corollary info": "Action code, auxiliary command; descriptions vary. Many M-codes call for machine functions, which is why people often say that the \"M\" stands for \"machine\", although it was not intended to.",
            "action": function() {

            }
        },
        "N": {
            "Description": "Line (block) number in program; System parameter number to be changed using G10",
            "Corollary info": "*Line (block) numbers:* Optional, so often omitted. Necessary for certain tasks, such as M99 P address (to tell the control which block of the program to return to if not the default one) or GoTo statements (if the control supports those). N numbering need not increment by 1 (for example, it can increment by 10, 20, or 1000) and can be used on every block or only in certain spots throughout a program. *System parameter number:* G10 allows changing of system parameters under program control.",
            "action": function() {

            }
        },
        "O": {
            "Description": "Program name",
            "Corollary info": "For example, O4501. For many years it was common for CNC control displays to use slashed zero glyphs to ensure effortless distinction of letter \"O\" from digit \"0\". Today's GUI controls often have a choice of fonts, like a PC does.",
            "action": function() {

            }
        },
        "P": {
            "Description": "Serves as parameter address for various G and M codes",
            "Corollary info": "- With G04, defines dwell time value. - Also serves as a parameter in some canned cycles, representing dwell times or other variables. - Also used in the calling and termination of subprograms. (With M98, it specifies which subprogram to call; with M99, it specifies which block number of the main program to return to.)",
            "action": function() {

            }
        },
        "Q": {
            "Description": "Peck increment in canned cycles",
            "Corollary info": "For example, G73, G83 (peck drilling cycles)",
            "action": function() {

            }
        },
        "R": {
            "Description": "Defines size of arc radius, or defines retract height in milling canned cycles",
            "Corollary info": "For radii, not all controls support the R address for G02 and G03, in which case IJK vectors are used. For retract height, the \"R level\", as it's called, is returned to if G99 is programmed.",
            "action": function() {

            }
        },
        "S": {
            "Description": "Defines speed, either spindle speed or surface speed depending on mode",
            "Corollary info": "Data type = integer. In G97 mode (which is usually the default), an integer after S is interpreted as a number of rev/min (rpm). In G96 mode (CSS), an integer after S is interpreted as surface speed—sfm (G20) or m/min (G21). See also Speeds and feeds. On multifunction (turn-mill or mill-turn) machines, which spindle gets the input (main spindle or subspindles) is determined by other M codes.",
            "action": function() {

            }
        },
        "T": {
            "Description": "Tool selection",
            "Corollary info": "To understand how the T address works and how it interacts (or not) with M06, one must study the various methods, such as lathe turret programming, ATC fixed tool selection, ATC random memory tool selection, the concept of \"next tool waiting\", and empty tools. Programming on any particular machine tool requires knowing which method that machine uses. Ways of obtaining this training are mentioned in the comments for M06.",
            "action": function() {

            }
        },
        "U": {
            "Description": "Incremental axis corresponding to X axis (typically only lathe group A controls) Also defines dwell time on some machines (instead of \"P\" or \"X\").",
            "Corollary info": "In these controls, X and U obviate G90 and G91, respectively. On these lathes, G90 is instead a fixed cycle address for roughing.",
            "action": function() {

            }
        },
        "V": {
            "Description": "Incremental axis corresponding to Y axis",
            "Corollary info": "Until the 2000s, the V address was very rarely used, because most lathes that used U and W didn't have a Y-axis, so they didn't use V. (Green *et al.* 1996[5] did not even list V in their table of addresses.) That is still often the case, although the proliferation of live lathe tooling and turn-mill machining has made V address usage less rare than it used to be (Smid 2008[3] shows an example). See also G18.",
            "action": function() {

            }
            },
        "W": {
            "Description": "Incremental axis corresponding to Z axis (typically only lathe group A controls)",
            "Corollary info": "In these controls, Z and W obviate G90 and G91, respectively. On these lathes, G90 is instead a fixed cycle address for roughing.",
            "action": function() {

            }
        },
        "*X*": {
            "Description": "Absolute or incremental position of X axis. Also defines dwell time on some machines (instead of \"P\" or \"U\").",
            "Corollary info": "",
            "action": function() {

            }
        },
        "*Y*": {
            "Description": "Absolute or incremental position of Y axis",
            "Corollary info": "",
            "action": function() {

            }
        },
        "*Z*": {
            "Description": "Absolute or incremental position of Z axis",
            "Corollary info": "The main spindle's axis of rotation often determines which axis of a machine tool is labeled as Z.",
            "action": function() {

            }
        }
    };