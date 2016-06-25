    var mcodes = {
        "M00": {
            "Description": "Compulsory stop",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Non-optional—machine will always stop upon reaching M00 in the program  execution.",
            'action': function() {
                
            }
        },
        "M01": {
            "Description": "Optional stop",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Machine will only stop at M01 if operator has pushed the optional stop  button.",
            'action': function() {
                
            }
        },
        "M02": {
            "Description": "End of program",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Program ends; execution may or may not return to program top (depending on  the control); may or may not reset register values. M02 was the original  program-end code, now considered obsolete, but still supported for backward  compatibility.[7] Many modern controls treat M02 as equivalent to M30.[7]  See M30 for additional discussion of control status upon executing M02 or  M30.",
            'action': function() {
                
            }
        },
        "M03": {
            "Description": "Spindle on (clockwise rotation)",
            "Milling": true,
            "Turning": true,
            "Corollary info": "The speed of the spindle is determined by the address S, in either revolutions  per minute (G97 mode; default) or surface feet per minute or [surface]  meters per minute (G96 mode [CSS] under either G20 or G21). The right-hand  rule can be used to determine which direction is clockwise and which  direction is counter-clockwise.   Right-hand-helix screws moving in the tightening direction (and  right-hand-helix flutes spinning in the cutting direction) are defined as  moving in the M03 direction, and are labeled \"clockwise\" by convention. The  M03 direction is always M03 regardless of local vantage point and local  CW/CCW distinction.",
            'action': function() {
                spindleRotation = 'clockwise';
            }
        },
        "M04": {
            "Description": "Spindle on (counterclockwise rotation)",
            "Milling": true,
            "Turning": true,
            "Corollary info": "See comment above at M03.",
            'action': function() {
                spindleRotation = 'counterclockwise';
            }
        },
        "M05": {
            "Description": "Spindle stop",
            "Milling": true,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                spindleState = 'off';
            }
        },
        "M06": {
            "Description": "Automatic tool change (ATC)",
            "Milling": true,
            "Turning": "T (some-times)",
            "Corollary info": "Many lathes do not use M06 because the T address itself indexes the turret. Programming on any particular machine tool requires knowing which method  that machine uses. To understand how the T address works and how it  interacts (or not) with M06, one must study the various methods, such as  lathe turret programming, ATC fixed tool selection, ATC random memory tool  selection, the concept of \"next tool waiting\", and empty tools. These  concepts are taught in textbooks such as Smid,[3] and online multimedia  (videos, simulators, etc.); all of these teaching resources are usually  paywalled to pay back the costs of their development. They are used in  training classes for operators, both on-site and remotely (e.g., Tooling  University).",
            'action': function() {
                
            }
        },
        "M07": {
            "Description": "Coolant on (mist)",
            "Milling": true,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                coolantState = 'mist';
            }
        },
        "M08": {
            "Description": "Coolant on (flood)",
            "Milling": true,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                coolantState = 'flood';
            }
        },
        "M09": {
            "Description": "Coolant off",
            "Milling": true,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                coolantState = 'off';
            }
        },
        "M10": {
            "Description": "Pallet clamp on",
            "Milling": true,
            "Turning": false,
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                palletClampState = 'on';
            }
        },
        "M11": {
            "Description": "Pallet clamp off",
            "Milling": true,
            "Turning": false,
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                palletClampState = off;
            }
        },
        "M13": {
            "Description": "Spindle on (clockwise rotation) and coolant on (flood)",
            "Milling": true,
            "Turning": false,
            "Corollary info": "This one M-code does the work of both M03 and M08. It is not unusual for  specific machine models to have such combined commands, which make for  shorter, more quickly written programs.",
            'action': function() {
                spindleState = 'on';
                spindleRotation = 'clockwise';
                coolantState = 'flood';
            }
        },
        "M19": {
            "Description": "Spindle orientation",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Spindle orientation is more often called within cycles (automatically) or  during setup (manually), but it is also available under program control via  *M19*. The abbreviation OSS (oriented spindle stop) may be seen in  reference to an oriented stop within cycles.   The relevance of spindle orientation has increased as technology has  advanced. Although 4- and 5-axis contour milling and CNC single-pointing  have depended on spindle position encoders for decades, before the advent  of widespread live tooling and mill-turn/turn-mill systems, it was seldom  relevant in \"regular\" (non-\"special\") machining for the operator (as  opposed to the machine) to know the angular orientation of a spindle except  for within a few restricted contexts (such as tool change, or G76 fine  boring cycles with choreographed tool retraction). Most milling of features  indexed around a turned workpiece was accomplished with separate operations  on indexing head setups; in a sense, indexing heads were invented as  separate pieces of equipment, to be used in separate operations, which  could provide precise spindle orientation in a world where it otherwise  mostly didn't exist (and didn't need to). But as CAD/CAM and multiaxis CNC  machining with multiple rotary-cutter axes becomes the norm, even for  \"regular\" (non-\"special\") applications, machinists now frequently care  about stepping just about *any* spindle through its 360° with precision.",
            'action': function() {
                
            }
        },
        "M21": {
            "Description": "Tailstock forward",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M22": {
            "Description": "Tailstock backward",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M23": {
            "Description": "Thread gradual pullout ON",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M24": {
            "Description": "Thread gradual pullout OFF",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M30": {
            "Description": "End of program, with return to program top",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Today M30 is considered the standard program-end code, and will return  execution to the top of the program. Today most controls also still support  the original program-end code, M02, usually by treating it as equivalent to  M30. *Additional info:* Compare M02 with M30. First, M02 was created, in  the days when the punched tape was expected to be short enough to be  spliced into a continuous loop (which is why on old controls, M02 triggered  no tape rewinding).[7] The other program-end code, M30, was added later to  accommodate longer punched tapes, which were wound on a reel and thus  needed rewinding before another cycle could start.[7] On many newer  controls, there is no longer a difference in how the codes are  executed—both act like M30.",
            'action': function() {
                
            }
        },
        "M41": {
            "Description": "Gear select – gear 1",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M42": {
            "Description": "Gear select – gear 2",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M43": {
            "Description": "Gear select – gear 3",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M44": {
            "Description": "Gear select – gear 4",
            "Milling": false,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M48": {
            "Description": "Feedrate override allowed",
            "Milling": true,
            "Turning": true,
            "Corollary info": "",
            'action': function() {
                
            }
        },
        "M49": {
            "Description": "Feedrate override NOT allowed",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Prevent MFO. This rule is also usually called (automatically) within  tapping cycles or single-point threading cycles, where feed is precisely  correlated to speed. Same with spindle speed override (SSO) and feed hold  button. Some controls are capable of providing SSO and MFO during threading.",
            'action': function() {
                
            }
        },
        "M52": {
            "Description": "Unload Last tool from spindle",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Also empty spindle.",
            'action': function() {
                
            }
        },
        "M60": {
            "Description": "Automatic pallet change (APC)",
            "Milling": true,
            "Turning": false,
            "Corollary info": "For machining centers with pallet changers",
            'action': function() {
                
            }
        },
        "M98": {
            "Description": "Subprogram call",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Takes an address P to specify which subprogram to call, for example, \"M98  P8979\" calls subprogram O8979.",
            'action': function() {
                
            }
        },
        "M99": {
            "Description": "Subprogram end",
            "Milling": true,
            "Turning": true,
            "Corollary info": "Usually placed at end of subprogram, where it returns execution control to  the main program. The default is that control returns to the block  following the M98 call in the main program. Return to a different block  number can be specified by a P address. M99 can also be used in main  program with block skip for endless loop of main program on bar work on  lathes (until operator toggles block skip).",
            'action': function() {
                
            }
        }
    };
