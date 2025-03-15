import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

  export default function Popup() {
    return(
        <AlertDialog>
        <AlertDialogTrigger>Title of section to click into and maybe description</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
          <div className="w-[20%] flex flex-col absolute left-[80%]">
                    <p>
                        1st file
                    </p>
                    <p>
                        2nd file
                    </p>
                    <p>
                        2rd file
                    </p>
                </div>
            <AlertDialogTitle>Title of Section </AlertDialogTitle>
            <AlertDialogDescription>
                <div className="w-[80%]">
                
                    Contents of the section: Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis sodales primis justo eu curae curae habitasse. Mauris dui sagittis consequat mattis luctus inceptos scelerisque. Vestibulum ornare netus condimentum luctus in; rutrum pulvinar primis condimentum. Duis finibus proin consectetur nibh purus blandit. Proin massa per curabitur dui massa donec. Proin pellentesque pharetra sagittis elit consectetur tempus augue semper.
                Sapien orci platea vivamus consequat, montes porta feugiat. Nisi est porttitor potenti malesuada nisl quis. Mattis nisl montes pretium ultricies mauris semper sem? Laoreet curabitur eleifend ac diam facilisi cras id. Ridiculus eros ex aptent consequat congue condimentum fusce. Suspendisse velit aenean mauris elit vitae sodales magna. Dignissim vitae tempor massa habitant nostra senectus ut? Ac arcu interdum eros adipiscing auctor parturient proin imperdiet. Integer lobortis eget eu consectetur sem aptent aliquet dolor? Nisi lacinia fusce praesent praesent scelerisque.
                Justo convallis litora ultricies ullamcorper pulvinar mollis platea tempor venenatis. Maecenas felis in habitant et facilisi auctor tortor aliquam nostra. Natoque nec felis ut nunc feugiat accumsan varius integer. Aenean ullamcorper maecenas sed sapien metus integer fermentum. Commodo dis adipiscing tempor et venenatis litora consequat. Lacinia feugiat facilisis non porta, aenean lacus aptent.
                Commodo id fringilla at lacinia consequat sociosqu. Commodo cursus iaculis eu condimentum quisque. Scelerisque erat habitant phasellus himenaeos malesuada; augue lobortis dolor taciti. Natoque faucibus netus placerat; platea cras taciti. Lobortis nibh suspendisse nec ex ligula accumsan nunc, venenatis felis. Proin arcu dictum urna iaculis inceptos convallis mus sodales maecenas. Et risus odio mi praesent consectetur nascetur felis vulputate convallis. Convallis conubia quisque praesent dapibus justo tincidunt. Sagittis pellentesque habitant montes curabitur platea laoreet. Adipiscing sollicitudin et purus interdum himenaeos vel accumsan et!
                Ridiculus et magnis maximus adipiscing sodales id mauris. Nascetur mauris habitant tempus phasellus natoque varius tortor curae. Sem neque ultrices aliquam, semper felis nec sagittis. Auctor mi fusce mauris morbi fames turpis. Fermentum auctor inceptos sit justo ante netus cursus. Rutrum fringilla quis fusce iaculis torquent praesent. Interdum magnis tellus consectetur senectus justo risus potenti suscipit. Non vel tristique sit placerat; facilisis erat habitant montes.
                
                </div>
    
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>come back later</AlertDialogCancel>
            <AlertDialogAction>Finish</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

  }