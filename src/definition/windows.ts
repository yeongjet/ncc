export type IMAGE_SECTION_HEADER = {
    Name: string
    Misc: {
        PhysicalAddress: number
        VirtualSize: number
    }
    VirtualAddress: number
    SizeOfRawData: number
    PointerToRawData: number
    PointerToRelocations: number
    PointerToLinenumbers: number
    NumberOfRelocations: number
    NumberOfLinenumbers: number
    Characteristics: number
}

export const IMAGE_NUMBEROF_DIRECTORY_ENTRIES  = 16
export const IMAGE_SIZEOF_SHORT_NAME           = 8
export const IMAGE_REL_I386_DIR32              = 0x0006  // Direct 32-bit reference to the symbols virtual address
export const IMAGE_REL_I386_REL32              = 0x0014  // PC-relative 32-bit reference to the symbols virtual address
export const IMAGE_SUBSYSTEM_WINDOWS_GUI       = 2   // Image runs in the Windows GUI subsystem.
export const IMAGE_SUBSYSTEM_WINDOWS_CUI       = 3   // Image runs in the Windows character subsystem.
export const IMAGE_DIRECTORY_ENTRY_IMPORT      = 1   // Import Directory
export const IMAGE_DIRECTORY_ENTRY_IAT         = 12   // Import Address Table
export const IMAGE_SYM_UNDEFINED               = 0          // Symbol is undefined or is common.
export const IMAGE_SYM_CLASS_EXTERNAL          = 0x0002
export const MAX_PATH                          = 260
export const IMAGE_FILE_MACHINE_I386           = 0x014c  // Intel 386.
export const IMAGE_SYM_CLASS_STATIC            = 0x0003
export const IMAGE_SYM_CLASS_NULL              = 0x0000
export const IMAGE_SCN_LNK_REMOVE              = 0x00000800  // Section contents will not become part of image.
export const IMAGE_SCN_CNT_UNINITIALIZED_DATA  = 0x00000080  // Section contains uninitialized data.
export const IMAGE_SCN_CNT_INITIALIZED_DATA    = 0x00000040  // Section contains initialized data.
export const IMAGE_SCN_MEM_WRITE               = 0x80000000  // Section is writeable.
export const IMAGE_SCN_MEM_READ                = 0x40000000  // Section is readable.
export const IMAGE_SCN_CNT_CODE                = 0x00000020  // Section contains code.
export const IMAGE_SCN_MEM_EXECUTE             = 0x20000000  // Section is executable.
export const FOREGROUND_INTENSITY              = 0x0008 // text color is intensified.
export const FOREGROUND_GREEN                  = 0x0002 // text color contains green.
export const FOREGROUND_RED                    = 0x0004 // text color contains red.
