import UnityEngine;
import System.Collections;

public class PullUpWall extends MonoBehaviour {
//public class PullUpWall : MonoBehaviour {


	public var rockSound : AudioClip;
	public var wall : GameObject;
	private var source : AudioSource;
	public var Controller : OVRInput.Controller;

	private var playedWallSound : boolean = false;

	function Awake() {
		source = GetComponent.<AudioSource> ();

	}

	// Update is called once per frame
	function Update () {
//		if (OVRInput.Axis1D.PrimaryHandTrigger.ToString() == 1){
//			Debug.Log (Time.time);
//		}

		//Debug.Log (Input.GetAxis ("RHandTrigger").ToString ());
		//Debug.Log (OVRInput.Axis1D.PrimaryHandTrigger.ToString());
		//ebug.Log (OVRInput.GetActiveController ().ToString ());
		if (Input.GetAxis("RHandTrigger") == 1 || Input.GetAxis("LHandTrigger") == 1) {
			//Debug.Log ("Right");
			//createRockWall();
			//transform.localPosition = OVRInput.GetLocalControllerPosition(Controller);

			playSound();

		}


	
	}

	function playSound(){
		if (!playedWallSound) {
			source.PlayOneShot(rockSound, 1f);
			playedWallSound = true;
		}
	}
}
